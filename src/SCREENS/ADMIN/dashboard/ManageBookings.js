import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const categories = ['All', 'Pending', 'Active', 'Completed', 'Cancelled'];

const ManageBookings = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsRef = collection(db, 'bookings');
        const querySnapshot = await getDocs(bookingsRef);

        const fetchedBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(fetchedBookings);
      } catch (err) {
        console.error('Error fetching bookings: ', err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on selected category and search query
  const filteredBookings = bookings.filter(
    (booking) =>
      (selectedCategory === 'All' || booking.status === selectedCategory) 
  );

  // Render each booking card
  const renderBookingCard = ({ item }) => {
    const MissionDate = item.MissionDate instanceof Timestamp
      ? item.MissionDate.toDate()
      : new Date(item.MissionDate); // Handle case where it's already a Date or string

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() => navigation.navigate('BookingDetailsScreen', { booking: item })}
      >
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingTitle}>{item.service}</Text>
          <Text style={styles.bookingProfessional}>Professional: {item.ProfessionalName}</Text>
          <Text style={styles.bookingProfessional}>Clinic: {item.ClinicName}</Text>
          <Text style={styles.bookingDate}>
            {MissionDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={styles.bookingPrice}>{item.price}</Text>
        </View>
        <View style={styles.bookingStatus}>
          <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookingsContainer}
        />
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
    backgroundColor: '#4F63AC',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#4A90E2',
  },
  categoriesContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: '#E0E0E0',
    minWidth: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4A90E2',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  bookingsContainer: {
    padding: 10,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  bookingProfessional: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A90E2',
  },
  bookingStatus: {
    alignItems: 'flex-end',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pending: {
    backgroundColor: '#FFF3E0',
    color: '#FF9800',
  },
  active: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  completed: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3',
  },
  bookingArrow: {
    marginTop: 5,
  },
  loader: {
    alignItems: 'center',
    height: '100%',
  },
  errorText: {
    fontSize: 16,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ManageBookings;