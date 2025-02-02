import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../../../FIREBASE/config'; // Adjust your Firebase config import accordingly
import * as Location from 'expo-location'; // Import location module
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window'); // Get screen width

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

export default function NearbyProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // To store user's location
  const navigation = useNavigation();

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          getUserLocation;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords); // Save user's location
      } catch (err) {
        console.error('Error getting location:', err);
      }
    };

    getUserLocation(); // Fetch user location on component mount
  }, []);

  useEffect(() => {
    let isMounted = true; // Add a flag to check if the component is still mounted

    const fetchProfessionals = async () => {
      if (!userLocation || !isMounted) return; // Wait until userLocation is available or component unmounted

      try {
        const db = getFirestore(firebaseApp);
        const professionalsRef = collection(db, 'users'); // Assuming 'users' collection contains user data
        const q = query(professionalsRef, where('role', '==', 'Professional')); // Filter by role 'Professional'

        const querySnapshot = await getDocs(q);
        const professionalsList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.location) {
            const { latitude, longitude } = data.location;
            const distance = haversine(userLocation.latitude, userLocation.longitude, latitude, longitude);
            if (distance <= 30) { // Only consider professionals within 30 km
              professionalsList.push({
                id: doc.id,
                ...data,
                distance, // Add the calculated distance to the professional data
              });
            }
          }
        });

        // Limit to 5 professionals and sort by distance
        const limitedProfessionals = professionalsList
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);

        setProfessionals(limitedProfessionals); // Set filtered professionals
      } catch (error) {
        console.error('Error fetching professionals:', error);
      } finally {
        if (isMounted) {
          setLoading(false); // Set loading to false when data fetching is complete
        }
      }
    };

    fetchProfessionals();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [userLocation]); // Re-run when userLocation changes

  const renderProfessionalItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialty}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={16} color="#FFA500" />
        <Text style={styles.rating}>{item.rating ? item.rating.toFixed(1) : 'N/A'}</Text>
      </View>
      <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('ProfessionalProfile', { professional: item })}>
        <Text style={styles.viewProfileText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Nearby Professionals</Text>
        {/* See All button with arrow */}
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('NearbyProfessionals')}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loadingIndicator} /> // Show ActivityIndicator when loading
      ) : (
        <FlatList
          horizontal
          data={professionals}
          keyExtractor={(item) => item.id}
          renderItem={renderProfessionalItem}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: -80, // Adjust marginTop for spacing if needed
  },
  headerContainer: {
    flexDirection: 'row', // Align title and button in a row
    justifyContent: 'flex-start', // Space out title and button
    alignItems: 'center', // Vertically center the elements
    marginBottom: 10, // Add margin below the header
  },
  title: {
    fontSize: width * 0.045, // Scales font size based on screen width
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row', // Align text and arrow in a row
    marginLeft: 145,
    alignItems: 'center', // Vertically center the arrow with the text
  },
  seeAllText: {
    fontSize: width * 0.04, // Scales text size
    fontWeight: '600',
    color: 'blue',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 30,
    width: width * 0.4, // 40% of screen width for card size
    alignItems: 'center',
    elevation: 3, // Adds shadow for Android
  },
  avatar: {
    width: width * 0.15, // Scales avatar size relative to screen width
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginBottom: 10,
  },
  name: {
    fontSize: width * 0.04, // Scales text size
    fontWeight: '600',
    textAlign: 'center', // Centers text if names are long
  },
  specialty: {
    fontSize: width * 0.035, // Scales text size
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginLeft: 4,
  },
  viewProfileButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'center',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
