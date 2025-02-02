import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { db } from '../../../FIREBASE/config';
import { collection, query, where, getDocs ,doc,updateDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { format } from 'date-fns';
import {fetchSummaryData}from './fetchData'



const SummaryCard = ({ title, value, icon }) => (
  <TouchableOpacity style={styles.summaryCard}>
    <Feather name={icon} size={24} color="#4F63AC" />
    <Text style={styles.summaryNumber}>{value}</Text>
    <Text style={styles.summaryText}>{title}</Text>
  </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = getAuth().currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    fetchAppointments();
    fetchSummary();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsRef = collection(db, 'bookings');
      const q = query(appointmentsRef, 
        where('selectedClinic', '==', userId),
        where('status', '==', 'Pending'),
      );
      const querySnapshot = await getDocs(q);

      const fetchedAppointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    const data = await fetchSummaryData(userId);
    setSummaryData(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    await fetchSummary();
    setRefreshing(false);
  };

  const renderSummaryItem = ({ item }) => (
    <SummaryCard title={item.title} value={item.value} icon={item.icon} />
  );

  const renderAppointmentItem = ({ item }) => (
    <View key={item.id} style={styles.requestCard}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestName}>{item.PatientName}</Text>
        <Text style={styles.requestService}>{item.service}</Text>
        <Text style={styles.requestTime}>
                  {format(item.MissionDate, 'MMM d, yyyy - h:mm a')}
                </Text>
      </View>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Clinic Dashboard</Text>
            <FlatList
              data={summaryData}
              renderItem={renderSummaryItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.summaryRow}
              scrollEnabled={false}
            />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Appointments')}>
                <Feather name="calendar" size={24} color="#FFF" />
                <Text style={styles.quickActionText}>View Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Services')}>
                <Feather name="list" size={24} color="#FFF" />
                <Text style={styles.quickActionText}>Manage Services</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Appointment Requests</Text>
          </>
        }
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No appointments found</Text>
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  summaryRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  summaryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: '#4F63AC',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  requestCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  requestService: {
    fontSize: 14,
    color: '#666',
  },
  requestTime: {
    fontSize: 14,
    color: '#4F63AC',
    marginTop: 5,
  },
  requestActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  refuseButton: {
    backgroundColor: '#F44336',
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
});

export default DashboardScreen;

