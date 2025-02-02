import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectionScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNext = () => {
    if (selectedRole) {
        switch (selectedRole) {
          case 'Patient':
            navigation.navigate('PatientInformationsScreen');
            break;
          case 'Clinic':
            navigation.navigate('ClinicInformationsScreen');
            break;
          case 'Professional':
            navigation.navigate('ProfessionalInformationsScreen');
            break;
          default:
            alert('Invalid role selected.');
        }
      } else {
        alert('Please select a role to proceed.');
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'Patient' && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole('Patient')}
        >
          <Ionicons name="heart-outline" size={40} color="#4c669f" />
          <Text style={styles.roleText}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'Clinic' && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole('Clinic')}
        >
          <Ionicons name="medkit-outline" size={40} color="#4c669f" />
          <Text style={styles.roleText}>Clinic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'Professional' && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole('Professional')}
        >
          <Ionicons name="people-outline" size={40} color="#4c669f" />
          <Text style={styles.roleText}>Professional</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    color:"#4F63AC"
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  roleCard: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4c669f',
    backgroundColor: '#eaf4fc',
  },
  roleText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#4c669f',
  },
  nextButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
