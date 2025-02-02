import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ServiceDetailsScreen = ({ route }) => {
  const { service } = route.params || {};

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

        {service.cancellationPolicy && (
          <>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.policyText}>{service.cancellationPolicy}</Text>
          </>
        )}
      </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: 20,
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
  policyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 40,
  },
});

export default ServiceDetailsScreen;