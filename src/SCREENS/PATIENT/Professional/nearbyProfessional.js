import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../../../FIREBASE/config'; // Ensure Firebase is configured
import * as Location from 'expo-location'; // Import location module

const { width, height } = Dimensions.get('window');

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

// Nearby professionals component
const NearbyProfessionals = ({ route, navigation }) => {
  const [professionals, setProfessionals] = useState([]); // To store filtered professionals
  const [loading, setLoading] = useState(true); // To handle loading state
  const [userLocation, setUserLocation] = useState(null); // To store user's location
  const [error, setError] = useState(null); // To handle errors

  // Fetch all professionals with the role 'Professional'
  useEffect(() => {
    const fetchProfessionalsByRole = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const professionalsRef = collection(db, 'users'); // Assuming 'users' collection contains user data
        const q = query(professionalsRef, where('role', '==', 'Professional')); // Filter by role 'Professional'

        const querySnapshot = await getDocs(q);
        const professionalsList = [];

        querySnapshot.forEach((doc) => {
          professionalsList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setProfessionals(professionalsList); // Set the fetched professionals
        setLoading(false);
      } catch (error) {
        console.error('Error fetching professionals:', error);
        setLoading(false);
      }
    };

    fetchProfessionalsByRole();
  }, []);

  // Get user's current location
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords); // Save user's location
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Unable to retrieve location');
    }
  };

  useEffect(() => {
    getUserLocation(); // Fetch user location on component mount
  }, []);

  // Filter professionals based on distance
  const filterNearbyProfessionals = (professionals) => {
    if (!userLocation) return professionals; // If no location, return all professionals

    const filteredProfessionals = professionals.filter((professional) => {
      if (professional.location) {
        const { latitude, longitude } = professional.location;
        const distance = haversine(userLocation.latitude, userLocation.longitude, latitude, longitude);
        return distance <= 30; // Show professionals within 50 km
      }
      return false;
    });

    return filteredProfessionals;
  };

  // Render professional item
  const renderProfessionalItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.image || 'https://via.placeholder.com/150' }} />
      <View style={styles.professionalInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFA500" />
          <Text style={styles.rating}>{item.rating ? item.rating.toFixed(1) : 'N/A'}</Text>
        </View>
        <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('ProfessionalProfile', { professional: item })}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const nearbyProfessionals = filterNearbyProfessionals(professionals);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4F63AC', '#4F63AC']} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Professionals</Text>
      </LinearGradient>

      {loading ? (
        <Text style={styles.loadingText}>Loading professionals...</Text>
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <FlatList
            data={nearbyProfessionals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProfessionalItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  professionalInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
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
    alignSelf: 'flex-start',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
    marginTop: 20,
  },
});

export default NearbyProfessionals;
