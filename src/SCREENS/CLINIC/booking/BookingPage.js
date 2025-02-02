import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import { Feather ,Ionicons} from '@expo/vector-icons';
import { format } from 'date-fns';
import { db } from '../../../FIREBASE/config';
import { collection, query, where, getDocs,updateDoc,doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const AppointmentsPage = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const user = getAuth().currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsRef = collection(db, 'bookings');
      const q = query(appointmentsRef, where('selectedClinic', '==', userId));
      const querySnapshot = await getDocs(q);

      const fetchedAppointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('fetchedAppointments:', fetchedAppointments);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'Pending' && appointment.status==="Pending") ||
      (filter === 'Active' && appointment.status==="Active") ||
      (filter === 'completed' && appointment.status==="Completed");

    const matchesSearch =
      appointment.ProfessionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('BookingDetailsScreen', { booking: item })}
    >
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{item.PatientName}</Text>
        <Text style={styles.serviceType}>{item.service}</Text>
        <Text style={styles.appointmentTime}>
          {format(item.MissionDate, 'MMM d, yyyy - h:mm a')}
        </Text>
      </View>
      <View style={styles.appointmentActions}>
        {item.status === 'Pending' ? (
          <View style={styles.requestActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]} 
              onPress={() => handleAcceptRequest(item.id)}
            >
              <Feather name="check" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.refuseButton]} 
              onPress={() => handleRefuseRequest(item.id)}
            >
              <Feather name="x" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : item.status === 'Active' ? (
          <TouchableOpacity
            style={styles.actionButton}
          >
            <Feather name="check-circle" size={20} color="#4A90E2" />
          </TouchableOpacity>
        ) : item.status === 'Completed' ? (
          <TouchableOpacity
            style={styles.actionButton}
          >
            <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const handleAcceptRequest = async (id) => {
    try {
      const appointmentRef = doc(db, 'bookings', id); // Reference to the appointment
      await updateDoc(appointmentRef, { status: 'Active' }); // Update status to 'Active'
      console.log(`Accepted request ${id}`);
     
    } catch (error) {
      console.error(`Error accepting request ${id}:`, error);
    }
  };
  
  const handleRefuseRequest = async (id) => {
    try {
      const appointmentRef = doc(db, 'bookings', id); // Reference to the appointment
      await updateDoc(appointmentRef, { status: 'Refused' }); // Update status to 'Refused'
      console.log(`Refused request ${id}`);
     
    } catch (error) {
      console.error(`Error refusing request ${id}:`, error);
    }
  };

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search appointments..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Pending' && styles.activeFilter]}
          onPress={() => setFilter('Pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Active' && styles.activeFilter]}
          onPress={() => setFilter('Active')}
        >
          <Text style={styles.filterText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredAppointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No appointments found</Text>
          }
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 16,
      },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius:20,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  listContainer: {
    paddingBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#4A90E2',
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
  requestActions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  refuseButton: {
    backgroundColor: '#F44336',
  },
});

export default AppointmentsPage;

