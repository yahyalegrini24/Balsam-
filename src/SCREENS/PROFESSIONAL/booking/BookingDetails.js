import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { booking } = route.params;

  const handleShowMap = () => {
    // Implement logic to show live view of the professional on the map
    navigation.navigate('MapScreen', { professionalId: booking.selectedProfessional });
  };

  const handleShowPatientProfile = () => {
    // Implement logic to show the patient profile
    navigation.navigate('PatientProfile', { patientId: booking.userId });
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <Text style={styles.serviceDetails}>{booking.serviceDetails}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon name="account" size={20} color="#4F63AC" style={styles.infoIcon} />
              <Text style={styles.infoText}>{booking.PatientName}</Text>
              <TouchableOpacity style={styles.viewProfileButton} onPress={handleShowPatientProfile}>
                <Text style={styles.viewProfileText}>Show Patient Profile</Text>
              </TouchableOpacity>
            </View>
            <InfoRow
              icon="calendar"
              text={new Date(booking.MissionDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
            <InfoRow icon="cash" text={`Price: ${booking.price}`} isPrice />
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, styles[booking.status.toLowerCase()]]}>
              {booking.status}
            </Text>
          </View>
        </View>
        {booking.status.toLowerCase() === 'active' && (
          <ActionButton icon="map-marker" text="show the patient location" onPress={handleShowMap} color="#2196F3" fullWidth />
        )}
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ icon, text, isPrice = false }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={20} color="#4F63AC" style={styles.infoIcon} />
    <Text style={[styles.infoText, isPrice && styles.price]}>{text}</Text>
  </View>
);

const ActionButton = ({ icon, text, onPress, color, fullWidth = false }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }, fullWidth && styles.fullWidthButton]}
    onPress={onPress}
  >
    <Icon name={icon} size={20} color="#FFF" style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4F63AC',
  },
  serviceDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusContainer: {
    alignItems: 'flex-start',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  fullWidthButton: {
    flex: 0,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewProfileButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'center',
    marginLeft: 10,
  },
  viewProfileText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default BookingDetailsScreen;

