import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/BottomNavigationBar';

const { width } = Dimensions.get('window');

const categories = ['All', 'Appointments', 'Medications', 'Updates', 'Alerts'];

const initialNotifications = [
  {
    id: '1',
    title: 'Upcoming Appointment',
    message: 'You have a check-up scheduled for tomorrow at 10:00 AM.',
    category: 'Appointments',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: '2',
    title: 'Medication Reminder',
    message: 'It\'s time to take your evening medication.',
    category: 'Medications',
    timestamp: '4h ago',
    read: true,
  },
  {
    id: '3',
    title: 'New Feature Available',
    message: 'Check out our new telemedicine service!',
    category: 'Updates',
    timestamp: '1d ago',
    read: false,
  },
  {
    id: '4',
    title: 'Urgent: Lab Results',
    message: 'Your recent lab results are now available. Please review them as soon as possible.',
    category: 'Alerts',
    timestamp: '2d ago',
    read: false,
  },
];

const NotificationScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = notifications.filter(
    notification => selectedCategory === 'All' || notification.category === selectedCategory
  );

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Icon name="delete-outline" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsContainer}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No notifications in this category</Text>
        }
      />

      <Footer />
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
  categoriesContainer: {
    paddingBottom: 30,  // Keep the padding consistent
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 100,  // Set fixed height to prevent the shift
    justifyContent: 'center', // Vertically center the category buttons
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,  // Keep consistent padding
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: '#E0E0E0',
    minWidth: 50, // Set minimum width for the button
    height: 40, // Set a fixed height for the button
    alignItems: 'center', // Ensure text is horizontally centered
    justifyContent: 'center', // Ensure text is vertically centered
  },
  selectedCategory: {
    backgroundColor: '#4A90E2', // Highlight selected category
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#FFF', // Change text color when selected
  },
  notificationsContainer: {
    padding: 10,
  },
  notificationItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 5,
    borderLeftColor: '#4F63AC',
  },
  readNotification: {
    opacity: 0.7,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default NotificationScreen;

