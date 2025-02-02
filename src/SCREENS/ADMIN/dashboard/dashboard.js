import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config'; // Adjust the path as needed
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

const quickActions = [
  { title: 'Manage Users', icon: 'account-cog', route: 'ManageUsers' },
  { title: 'Manage Bookings', icon: 'calendar-outline', route: 'ManageBookings' },
  { title: 'Manage Content', icon: 'file-document-edit', route: 'ManageContent' },
];

const notifications = [
  { id: 1, message: 'New system update available', type: 'info' },
  { id: 2, message: '5 new user registrations pending approval', type: 'warning' },
  { id: 3, message: 'Server maintenance scheduled for tonight', type: 'alert' },
];

const DashboardScreen = ({ navigation }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the latest user and latest booking from Firestore
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        // Fetch the latest user
        const usersRef = collection(db, 'users');
        const usersQuery = query(usersRef, orderBy('createdAt', 'desc'), limit(1));
        const usersSnapshot = await getDocs(usersQuery);

        // Fetch the latest booking based on bookingDate
        const bookingsRef = collection(db, 'bookings');
        const bookingsQuery = query(bookingsRef, orderBy('bookingDate', 'desc'), limit(1));
        const bookingsSnapshot = await getDocs(bookingsQuery);

        const activities = [];

        // Add the latest user to activities
        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          activities.push({
            id: userDoc.id,
            type: 'New User',
            name: userDoc.data().name,
            time: userDoc.data().createdAt.toDate(), // Convert Firestore timestamp to Date
          });
        }

        // Add the latest booking to activities
        if (!bookingsSnapshot.empty) {
          const bookingDoc = bookingsSnapshot.docs[0];
          const bookingData = bookingDoc.data();
          const bookingDateString = bookingData.bookingDate; // Get the bookingDate as a string
          const bookingDate = new Date(bookingDateString); // Convert the string to a Date object

          activities.push({
            id: bookingDoc.id,
            type: 'New Booking',
            name: bookingData.PatientName, // Use PatientName from the booking data
            professional: bookingData.ProfessionalName, // Use ProfessionalName from the booking data
            service: bookingData.service, // Use service from the booking data
            time: bookingDate, // Use the converted Date object
          });
        }

        setRecentActivities(activities);
      } catch (err) {
        console.error('Error fetching recent activities:', err);
        setError('Failed to fetch recent activities');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, []);

  // Format the timestamp to a readable format
  const formatTime = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.metricsButton}
          onPress={() => navigation.navigate('Metrics')}
        >
          <Text style={styles.buttonText}>View Detailed Metrics</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={() => navigation.navigate(action.route)}
            >
              <Icon name={action.icon} size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#4A90E2" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Icon
                  name={activity.type === 'New User' ? 'account-plus' : 'calendar-check'}
                  size={20}
                  color="#4A90E2"
                />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.boldText}>{activity.name}</Text> - {activity.type}
                  </Text>
                  {activity.type === 'New Booking' && (
                    <>
                      <Text style={styles.activitySubText}>
                        Professional: {activity.professional}
                      </Text>
                      <Text style={styles.activitySubText}>Service: {activity.service}</Text>
                    </>
                  )}
                  <Text style={styles.activityTime}>{formatTime(activity.time)}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.activityText}>No recent activity</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[styles.notificationItem, styles[notification.type]]}
            >
              <Icon
                name={
                  notification.type === 'info'
                    ? 'information'
                    : notification.type === 'warning'
                    ? 'alert'
                    : 'alert-circle'
                }
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.notificationText}>{notification.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  metricsButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  actionButtonText: {
    color: '#FFFFFF',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityContent: {
    marginLeft: 10,
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  activitySubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  notificationsContainer: {
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  info: {
    backgroundColor: '#4A90E2',
  },
  warning: {
    backgroundColor: '#FFA500',
  },
  alert: {
    backgroundColor: '#FF4500',
  },
  errorText: {
    color: '#FF4500',
    fontSize: 14,
  },
});

export default DashboardScreen;