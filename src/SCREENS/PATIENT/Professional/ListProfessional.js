import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config'; // Firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const ProfessionalList = ({ route, navigation }) => {
  const { service, onSelectProfessional } = route.params; // service.title will be used for filtering
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch professionals from Firestore
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionalsRef = collection(db, 'users'); // Assuming 'users' is the collection name
        const q = query(
          professionalsRef,
          where('role', '==', 'Professional'),
          where('services', 'array-contains', service.title) // Filter professionals based on the service.title
        );
        const querySnapshot = await getDocs(q);
        const fetchedProfessionals = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionals(fetchedProfessionals);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [service.title]); // Re-fetch when service.title changes

  const handleSelectProfessional = () => {
    if (selectedProfessional) {
      onSelectProfessional(selectedProfessional);
      navigation.goBack();
    } else {
      alert('Please select a professional first.');
    }
  };

  const renderProfessionalItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedProfessional?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedProfessional(item)}
    >
      <Image style={styles.image} source={{ uri: item.image || 'https://via.placeholder.com/100' }} />
      <View style={styles.professionalInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFA500" />
          <Text style={styles.rating}>{item.rating?.toFixed(1) || 'N/A'}</Text>
        </View>

        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={() => navigation.navigate('ProfessionalProfile', { professional: item })}
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4F63AC', '#4F63AC']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Professional</Text>
      </LinearGradient>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F63AC" />
          <Text style={styles.loadingText}>Loading professionals...</Text>
        </View>
      ) : (
        <FlatList
          data={professionals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProfessionalItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.chooseButton}
        onPress={handleSelectProfessional}
      >
        <Text style={styles.chooseButtonText}>
          {selectedProfessional ? 'Confirm Selection' : 'Choose a Professional'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  professionalInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginLeft: 4,
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
  },
  viewProfileButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  chooseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chooseButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4F63AC',
    marginTop: 10,
  },
});

export default ProfessionalList;
