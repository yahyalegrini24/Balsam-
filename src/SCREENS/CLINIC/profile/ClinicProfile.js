import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get('window');

const ProfileScreen = ({ route, navigation }) => {
  const userData = route.params && route.params.user;
  console.log(route.params);


  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No user data found</Text>
      </SafeAreaView>
    );
  }

  const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <LinearGradient
        colors={['#4F63AC', '#6A7FD9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconBackground}
      >
        <Icon name={icon} size={20} color="#FFF" />
      </LinearGradient>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4F63AC', '#6A7FD9']}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userData.avatar || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.patientIdContainer}>
            <Icon name="card-account-details-outline" size={16} color="#E6FFFA" />
            <Text style={styles.patientId}>Professional ID: {userData.id || 'N/A'}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoContainer}>
          <InfoItem icon="book-outline" label="Email" value={userData.bio} />
          <InfoItem icon="email-outline" label="Email" value={userData.email} />
          <InfoItem icon="phone-outline" label="Phone Number" value={userData.phoneNumber} />
          <InfoItem icon="map-marker-outline" label="Address" value={userData.Address} />
          <InfoItem icon="school-outline" label="Address" value={userData.specialty}/>
          <InfoItem icon="users" label="Gender" value={userData.gender} />
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  patientIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  patientId: {
    fontSize: 14,
    color: '#E6FFFA',
    marginLeft: 5,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginTop:10
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
