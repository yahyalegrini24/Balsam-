import {  collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '../../../FIREBASE/config';



export const fetchSummaryData = async (userId) => {
  try {
    const summaryData = [
      { id: '1', title: 'Total Appointments', value: await getTotalAppointments(userId), icon: 'clipboard' },
      { id: '2', title: 'Pending Requests', value: await getPendingRequests(userId), icon: 'calendar' },
      { id: '3', title: 'Accepted Appointments', value: await getAcceptedAppointments(userId), icon: 'check-circle' },
      { id: '4', title: 'Completed Appointments', value: await getCompletedAppointments(userId), icon: 'check-circle' },
      { id: '5', title: 'Rating', value: await getRating(userId), icon: 'star' },
      { id: '6', title: 'Paying Appointments', value: await getPayingAppointments(userId), icon: 'dollar-sign' },
      { id: '7', title: 'Top Service', value: await getTopService(userId), icon: 'bar-chart' },
      { id: '8', title: 'Clients Served', value: await getClientsServed(userId), icon: 'users' },
      { id: '9', title: 'Feedback Received', value: await getFeedbackReceived(userId), icon: 'message-circle' },
    ];
    return summaryData;
  } catch (error) {
    console.error('Error fetching summary data:', error);
    return [];
  }
};

const getTotalAppointments = async (userId) => {
  const appointmentsRef = collection(db, 'bookings');
  const q = query(appointmentsRef, where('selectedClinic', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

const getPendingRequests = async (userId) => {
  const appointmentsRef = collection(db, 'bookings');
  const q = query(appointmentsRef, where('selectedClinic', '==', userId), where('status', '==', 'Pending'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

const getAcceptedAppointments = async (userId) => {
  const appointmentsRef = collection(db, 'bookings');
  const q = query(appointmentsRef, where('selectedClinic', '==', userId), where('status', '==', 'Active'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};
const getCompletedAppointments = async (userId) => {
  const appointmentsRef = collection(db, 'bookings');
  const q = query(appointmentsRef, where('selectedClinic', '==', userId), where('status', '==', 'Completed'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

const getRating = async (userId) => {
  // Implement logic to fetch rating
  return 4.8; // Placeholder value
};

const getPayingAppointments = async (userId) => {
  const appointmentsRef = collection(db, 'bookings');
  const q = query(appointmentsRef, where('selectedClinic', '==', userId), where('isPaid', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

const getTopService = async (userId) => {
  // Implement logic to fetch top service
  return 'Service Name'; // Placeholder value
};

const getClientsServed = async (userId) => {
  // Implement logic to fetch clients served
  return 22; // Placeholder value
};

const getFeedbackReceived = async (userId) => {
  // Implement logic to fetch feedback received
  return 22; // Placeholder value
};


