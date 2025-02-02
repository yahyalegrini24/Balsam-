import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const { width } = Dimensions.get('window');

const ServicesPage = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = getAuth().currentUser;
  const userId = user ? user.uid : null;

  const fetchServices = async () => {
    try {
      if (!refreshing) setLoading(true); // Show loader only for the first fetch
      const querySnapshot = await getDocs(collection(db, 'services'));
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userServices = userDoc.exists() ? userDoc.data().services : [];

      const fetchedServices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isToggled: userServices.includes(doc.data().title), // Set toggle state based on user services
      }));
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refresh animation
    }
  };

  useEffect(() => {
    fetchServices();
  }, [userId]);

  const onToggle = async (id, title, isToggled) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      if (isToggled) {
        await updateDoc(userDocRef, {
          services: arrayRemove(title),
        });
      } else {
        await updateDoc(userDocRef, {
          services: arrayUnion(title),
        });
      }
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, isToggled: !isToggled } : service
        )
      );
    } catch (error) {
      console.error('Error updating user services:', error);
    }
  };

  const renderServiceCard = ({ item }) => (
    <View style={styles.serviceCard}>
      <TouchableOpacity
        style={styles.serviceContent}
        onPress={() =>
          navigation.navigate('ServicesDetailsScreen', { service: item })
        }
      >
        <Icon name={item.icon} size={40} color="#4A90E2" />
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceCategory}>{item.category}</Text>
      </TouchableOpacity>
      <Switch
        value={item.isToggled}
        onValueChange={() => onToggle(item.id, item.title, item.isToggled)}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.isToggled ? "#4F63AC" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.servicesContainer}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchServices();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesPage;
