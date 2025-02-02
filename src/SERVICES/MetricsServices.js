import { db } from '../FIREBASE/config';
import { collection, getDocs } from 'firebase/firestore';

export const getMetrics = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const servicesCollection = collection(db, 'services');
      const bookingsCollection = collection(db, 'bookings');
  
      const [usersSnapshot, servicesSnapshot, bookingsSnapshot] = await Promise.all([
        getDocs(usersCollection),
        getDocs(servicesCollection),
        getDocs(bookingsCollection),
      ]);
  
      const totalUsers = usersSnapshot.size;
      const totalServices = servicesSnapshot.size;
      const totalBookings = bookingsSnapshot.size;
      const completedBookings = bookingsSnapshot.docs.filter(doc => doc.data().status === 'completed').length;
      const activeBookings = bookingsSnapshot.docs.filter(doc => doc.data().status === 'active').length;
      const totalClinics = usersSnapshot.docs.filter(doc => doc.data().role === 'Clinic').length;
      const totalProfessionals = usersSnapshot.docs.filter(doc => doc.data().role === 'Professional').length;
      const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 2); // Define "new" as the last 7 days

    const newUsers = usersSnapshot.docs.filter(doc => {
      const userCreatedAt = doc.data().createdAt?.toDate(); // Convert Firestore timestamp to JavaScript Date
      return userCreatedAt && userCreatedAt >= sevenDaysAgo;
    }).length;
  
      const metrics = [
        { title: 'Total Users', value: totalUsers, icon: 'account-group' },
        { title: 'Services Offered', value: totalServices, icon: 'stethoscope' },
        { title: 'Total Bookings', value: totalBookings, icon: 'calendar-check-outline' },
        { title: 'Completed Bookings', value: completedBookings, icon: 'check-circle-outline' },
        { title: 'Active Bookings', value: activeBookings, icon: 'calendar-check-outline' },
        { title: 'Clinics', value: totalClinics, icon: 'hospital-building' },
        { title: 'Professionals', value: totalProfessionals, icon: 'doctor' },
        { title: 'Average Rating', value: '4.5/5', icon: 'star-outline' },
        { title: 'New Registrations', value: newUsers, icon: 'account-plus' },
        { title: 'Online Professionals', value: 0, icon: 'cloud-outline' },
        { title: 'Online Clinics', value: 0, icon: 'cloud-outline' },
        { title: 'Emergency Requests', value: 0, icon: 'alert-circle-outline'},
      ]
      return metrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      return [];
    }
  };