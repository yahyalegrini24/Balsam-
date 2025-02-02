import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config'; // Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getAuth } from "firebase/auth";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const { width } = Dimensions.get('window');

const ServiceDetailsScreen = ({ route, navigation }) => {
  const { service, selectedProfessional, selectedClinic,user} = route.params || {};
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  
  // Track if a professional or clinic is selected
  const [isProfessionalSelected, setIsProfessionalSelected] = useState(!!selectedProfessional);
  const [isClinicSelected, setIsClinicSelected] = useState(!!selectedClinic);
 
  // Function to handle booking and save it to Firestore
  const handleBooking = async () => {
    if (!selectedDateTime) {
      Alert.alert('Error', 'Please select a date and time before proceeding.');
      return;
    }
    
    const auth = getAuth();
    const userAuth = auth.currentUser; // Get the authenticated user

    if (!userAuth) {
      console.error('No user is logged in');
      return;
    }

    const userId = userAuth.uid;
    try {
      setIsBookingConfirmed(true);

      // Create a new booking in Firestore
      await addDoc(collection(db, 'bookings'), {
        userId: userId,
        service: service.title,
        serviceDetails: service.description,
        selectedProfessional: selectedProfessional ? selectedProfessional.id : 'N/A',
        selectedClinic: selectedClinic ? selectedClinic.id : 'N/A',
        MissionDate: selectedDateTime.toISOString(),
        bookingDate: new Date().toISOString(),
        status: 'Pending',
        ProfessionalName: selectedProfessional ? selectedProfessional.name : 'N/A',
        ClinicName: selectedClinic ? selectedClinic.clinicName : 'N/A',
        PatientName:user.name, 
        price: service.price,
        isPaid:false
      });

      // Show success message
      setTimeout(() => {
        setIsBookingConfirmed(false);
        navigation.goBack(); // Optional: Navigate back after booking
      }, 2000);
    } catch (error) {
      console.error('Error booking service:', error);
      setIsBookingConfirmed(false);
      alert('Booking failed. Please try again.');
    }
  };

  const showDatePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDateTime(date);
    hideDatePicker();
  };

  if (!service) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Service details not available.</Text>
      </View>
    );
  }

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
        <View style={styles.iconContainer}>
          <Icon name={service.icon || 'help-circle'} size={width * 0.15} color="#FFF" />
        </View>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.category}>{service.category}</Text>
      </LinearGradient>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>About this service</Text>
        <Text style={styles.description}>{service.description}</Text>

        <Text style={styles.sectionTitle}>Service Details</Text>
        <View style={styles.detailsContainer}>
          <DetailItem icon="clock-outline" text={`Duration: ${service.duration || 'N/A'} minutes`} />
          <DetailItem icon="currency-usd" text={`Price: ${service.price || 'N/A'}`} />
          <DetailItem icon="map-marker" text={`Location: ${service.location || 'N/A'}`} />
        </View>

        {service.included && service.included.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <View style={styles.listContainer}>
              {service.included.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.chooseProfessionalButton}
          onPress={showDatePicker}
        >
          <Text style={styles.chooseProfessionalText}>
            {selectedDateTime ? selectedDateTime.toLocaleString() : 'Select Date and Time'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Select Professional or Clinic</Text>
        {!isProfessionalSelected && !isClinicSelected && (
          <>
            <TouchableOpacity
              style={styles.chooseProfessionalButton}
              onPress={() => {
                navigation.navigate('ProfessionalList', {
                  service,
                  onSelectProfessional: (professional) => {
                    navigation.setParams({ selectedProfessional: professional });
                    setIsProfessionalSelected(true);
                    setIsClinicSelected(false);
                  },
                });
              }}
            >
              <Text style={styles.chooseProfessionalText}>Choose Professional</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseProfessionalButton}
              onPress={() => {
                navigation.navigate('ClinicListScreen', {
                  service,
                  onSelectClinic: (clinic) => {
                    navigation.setParams({ selectedClinic: clinic });
                    setIsClinicSelected(true);
                    setIsProfessionalSelected(false);
                  },
                });
              }}
            >
              <Text style={styles.chooseProfessionalText}>Choose Clinic</Text>
            </TouchableOpacity>
          </>
        )}

        {isProfessionalSelected && selectedProfessional && (
          <View style={styles.professionalInfo}>
            <Icon name="account" size={24} color="#4A90E2" />
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{selectedProfessional.name}</Text>
              <Text style={styles.professionalSpecialty}>{selectedProfessional.specialty}</Text>
              <Text style={styles.professionalRating}>Rating: {selectedProfessional.rating} ⭐</Text>
            </View>
          </View>
        )}

        {isClinicSelected && selectedClinic && (
          <View style={styles.professionalInfo}>
            <Icon name="account" size={24} color="#4A90E2" />
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{selectedClinic.name}</Text>
              <Text style={styles.professionalSpecialty}>{selectedClinic.specialty}</Text>
              <Text style={styles.professionalRating}>Rating: {selectedClinic.rating} ⭐</Text>
            </View>
          </View>
        )}

        {service.cancellationPolicy && (
          <>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.policyText}>{service.cancellationPolicy}</Text>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBooking}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={isBookingConfirmed}
        onRequestClose={() => setIsBookingConfirmed(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Icon name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Booking Confirmed!</Text>
            <Text style={styles.modalText}>
              {service.title} with {selectedClinic?.name ||selectedProfessional?.name  }
            </Text>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <Icon name={icon} size={20} color="#4A90E2" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Added extra space for the book button
  },
  scrollContent: {
    paddingBottom: 100, // Ensure enough space for the bottom button
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  professionalDetails: {
    marginLeft: 10,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  professionalRating: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 5,
  },
  chooseProfessionalButton: {
    backgroundColor: '#5DADE2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  chooseProfessionalText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  policyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 40,
  },
  dateTimeField: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 20,
    width: width - 40,
    marginLeft:20
  },
  bookButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ServiceDetailsScreen;
