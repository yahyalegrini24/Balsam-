import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const BookingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { booking } = route.params;

  const handleConfirm = () => {
    navigation.navigate('PaymentScreen', { booking });
  };

  const handleCancel = () => {
    // Implement cancellation logic here
    alert('Booking cancelled');
    navigation.goBack();
  };

  const handleReschedule = () => {
    // Implement rescheduling logic here
    alert('Reschedule functionality to be implemented');
  };

  const handleShowMap = () => {
    // Implement logic to show live view of the professional on the map
    navigation.navigate('MapScreen', { professionalId: booking.selectedProfessional });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.serviceName}>{booking.service}</Text>
          <Text style={styles.serviceDetails}>{booking.serviceDetails}</Text>
          <View style={styles.infoContainer}>
            <InfoRow icon="account" text={booking.PatientName} />
            <InfoRow icon="doctor" text={booking.ProfessionalName} />
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
            <InfoRow icon="hospital-building" text={`Clinic: ${booking.ClinicName}`} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, styles[booking.status.toLowerCase()]]}>
              {booking.status}
            </Text>
          </View>
        </View>

        {/* Conditionally render buttons based on booking status */}
        {booking.status.toLowerCase() === 'active' && (
          <>
            <View style={styles.buttonContainer}>
              <ActionButton icon="check" text="Confirm" onPress={handleConfirm} color="#4CAF50" />
              <ActionButton icon="close" text="Cancel" onPress={handleCancel} color="#F44336" />
              <ActionButton icon="calendar-clock" text="Reschedule" onPress={handleReschedule} color="#FF9800" />
            </View>
            <ActionButton icon="map-marker" text="Track the Professional" onPress={handleShowMap} color="#2196F3" fullWidth />
          </>
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
  header: {
    backgroundColor: "#4F63AC",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
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
});

export default BookingDetailsScreen;