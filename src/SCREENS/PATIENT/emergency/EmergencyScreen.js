import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/BottomNavigationBar';

const { width } = Dimensions.get('window');

const emergencyServices = [
  { 
    id: '1', 
    title: 'Ambulance', 
    icon: 'ambulance', 
    description: 'Immediate medical transport for life-threatening emergencies.',
    callNumber: '911',
  },
  { 
    id: '2', 
    title: 'Urgent Care', 
    icon: 'hospital-box', 
    description: 'For non-life-threatening but urgent medical needs.',
    callNumber: '+1-800-555-URGE',
  },
  { 
    id: '3', 
    title: 'Poison Control', 
    icon: 'biohazard', 
    description: 'Expert advice for poisoning emergencies.',
    callNumber: '+1-800-222-1222',
  },
  { 
    id: '4', 
    title: 'Mental Health Crisis', 
    icon: 'brain', 
    description: 'Immediate support for mental health emergencies.',
    callNumber: '+1-800-273-8255',
  },
  
];

const EmergencyServicesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = emergencyServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEmergencyServiceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('EmergencyServiceDetailsScreen', { service: item })}
    >
      <Icon name={item.icon} size={40} color="#E53935" />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.callButton}>
        <Icon name="phone" size={20} color="#FFF" />
        <Text style={styles.callButtonText}>Call Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Emergency Services</Text>
          </View>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color="#E53935" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search emergency services"
              placeholderTextColor="#E53935"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <FlatList
          data={filteredServices}
          renderItem={renderEmergencyServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.servicesContainer}
        />
      </View>
      <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#E53935',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#E53935',
  },
  servicesContainer: {
    padding: 10,
  },
  serviceCard: {
    width: (width - 40) / 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  callButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontWeight: '600',
  },
});

export default EmergencyServicesScreen;

