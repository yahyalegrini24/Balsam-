import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MessageCircle } from 'lucide-react-native';
import Header from '../components/Header';
import Footer from '../components/BottomNavigationBar';
import HealthcareService from '../components/HealtheCare';
import NearbyProfessionals from '../components/nearby';
import Emergency from '../components/emergency';
import NearbyClinic from '../components/nearbyClinic';

const HomePage = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params?.user;
  const navigateToAichat = () => {
    navigation.navigate('AIchat');
  };

  return (
    <View style={styles.container}>
      <StatusBar  barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header user={user}/>
        <HealthcareService />
        <NearbyProfessionals />
        <Emergency />
        <NearbyClinic />
      </ScrollView>
      
      <TouchableOpacity style={styles.chatButton} onPress={navigateToAichat}>
        <MessageCircle color="#FFFFFF" size={24} />
        <Text style={styles.chatButtonText}>Chat with AI</Text>
      </TouchableOpacity>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  chatButton: {
    position: 'absolute',
    right: 20,
    bottom: 80, // Adjust this value to position the button above the Footer
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomePage;

