import { db } from '../../FIREBASE/config'; // Ensure this path points to your Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as Location from 'expo-location'; // Import location module

// Haversine formula to calculate distance between two points on the Earth's surface
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

// Function to fetch nearby professionals from Firestore (filtering by role and distance)
export const fetchNearbyProfessionals = async () => {
  try {
    // Check and request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return [];
    }

    // Get user's current location
    const location = await Location.getCurrentPositionAsync({});
    const userLocation = location.coords;
    console.log('User Location:', userLocation); // Log the user's location for debugging

    // Query to get users with the role 'professional'
    const professionalsQuery = query(
      collection(db, 'users'),
      where('role', '==', 'Professional') // Assuming 'role' is the field and 'professional' is the role value
    );
     // Log the query for debugging

    const querySnapshot = await getDocs(professionalsQuery);
    const professionals = [];
   // Log the number of professionals for debugging

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.location) {
        const { latitude, longitude } = data.location;
        const distance = haversine(userLocation.latitude, userLocation.longitude, latitude, longitude);
        if (distance <= 30) { // Only consider professionals within 30 km
          professionals.push({
            id: doc.id,
            ...data,
            distance, // Add the calculated distance to the professional data
          });
        }
      }
    });

    // Sort professionals by distance (nearest first)
    const sortedProfessionals = professionals.sort((a, b) => a.distance - b.distance);
    return sortedProfessionals;

  } catch (error) {
    console.error('Error fetching professionals from Firestore:', error);
    throw new Error('Failed to fetch professionals from database.');
  }
};
export const fetchAllServices = async () => {
    try {
      // Query the 'services' collection in Firestore
      const servicesQuery = collection(db, 'services'); // Assuming 'services' is the collection name
      const querySnapshot = await getDocs(servicesQuery);
  
      if (querySnapshot.empty) {
        return []; // Return an empty array if no services are found
      }
  
      // Extract services from the query snapshot
      const services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Include all fields from the document
      }));
  
      return services;
    } catch (error) {
      console.error('Error fetching services from Firestore:', error);
      throw new Error('Failed to fetch services from database.');
    }
  };

let bookingState = {
    step: 0, // 0 = not started, 1 = name provided, 2 = service provided, 3 = date/time provided
    professionalName: null,
    service: null,
    dateTime: null,
  };
  
  // Function to reset the booking state
  const resetBookingState = () => {
    bookingState = {
      step: 0,
      professionalName: null,
      service: null,
      dateTime: null,
    };
  };
  
  // Function to fetch service details from Firestore
  const fetchServiceDetails = async (serviceTitle) => {
    try {
      console.log('Fetching service details for:', serviceTitle); // Debugging
      // Query the 'services' collection in Firestore
      const servicesQuery = query(
        collection(db, 'services'),
        where('name', '==', serviceTitle) // Assuming 'name' is the field for service title
      );
  
      const querySnapshot = await getDocs(servicesQuery);
      console.log('Firestore query result:', querySnapshot.docs); // Debugging
  
      if (querySnapshot.empty) {
        console.log('No service found in Firestore.'); // Debugging
        return null; // Return null if no service is found
      }
  
      // Return the first matching service document
      const serviceData = querySnapshot.docs[0].data();
      console.log('Service details fetched:', serviceData); // Debugging
      return serviceData;
    } catch (error) {
      console.error('Error fetching service details:', error);
      throw new Error('Failed to fetch service details.');
    }
  };
  
  // Function to handle the booking process
  export const makeBooking = async (message, userId, userName) => {
    try {
      console.log('User message:', message); // Debugging
  
      // Extract the professional's name and service title from the message
      const bookingRegex = /make booking with (\w+) for (\w+)/i;
      const match = message.match(bookingRegex);
  
      if (!match) {
        return 'Invalid booking request. Please specify a professional and service (e.g., "make booking with yahya for General Consultation").';
      }
  
      const [, professionalName, serviceTitle] = match; // Extract professional name and service title
  
      // Fetch service details from Firestore
      const serviceDetails = await fetchServiceDetails(serviceTitle);
      console.log('Service details fetched:', serviceDetails); // Debugging
  
      if (!serviceDetails) {
        return `Sorry, no service found with the title "${serviceTitle}". Please try again.`;
      }
  
      // Ask for the date and time
      return `Got it! The service "${serviceTitle}" costs ${serviceDetails.price}. When would you like to schedule the service? (Please provide a date and time, e.g., "October 25 at 3 PM").`;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking.');
    }
  };