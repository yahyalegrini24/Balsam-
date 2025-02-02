import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const AdminProfile = () => {
  const navigation = useNavigation();
  const adminData = {
    name: 'LEGRINI YEHYA',
    role: 'Senior Administrator',
    email: 'yehyalegrini@gmail.com',
    phone: '+213 552 64 67 92',
    totalPatients: 1250,
    activeProfessionals: 75,
  };

  const IconMail = () => (
    <Text style={styles.icon}>✉️</Text>
  );

  const IconPhone = () => (
    <Text style={styles.icon}>📞</Text>
  );

  
  const IconSettings = () => (
    <Text style={styles.icon}>⚙️</Text>
  );

  const IconLogOut = () => (
    <Text style={styles.icon}>🚪</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://via.placeholder.com/100' }}
          />
          <Text style={styles.name}>{adminData.name}</Text>
          <Text style={styles.role}>{adminData.role}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <IconMail />
            <Text style={styles.infoText}>{adminData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <IconPhone />
            <Text style={styles.infoText}>{adminData.phone}</Text>
          </View>
        </View>

        

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('Settings')}>
            <IconSettings />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
            <IconLogOut />
            <Text style={styles.actionText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 5,
  },
  card: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A5568',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 5,
  },
  actionsContainer: {
    margin: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4299E1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#F56565',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
  },
});

export default AdminProfile;

