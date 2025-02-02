import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star,  ChevronLeft, Heart, Mail, Phone, Globe, MessageCircle, ChevronRight } from 'react-native-feather';

const { width, height } = Dimensions.get('window');

const ModernClinicProfile = ({ route, navigation }) => {
  const { Clinic } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement logic to add/remove from favorites list
  };

  const handleBookNow = () => {
    // TODO: Implement booking logic
    console.log('Booking appointment with', Clinic.name);
  };

  const handleMessage = () => {
    // TODO: Implement messaging logic
    console.log('Messaging', Clinic.name);
  }; 

  const handleServicesPress = () => {
    navigation.navigate('CliServicesList', {Clinic});
  };
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#4F63AC', '#4F63AC']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft stroke="#FFF" width={24} height={24} />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: Clinic.profileImageUrl }}
          />
          <Text style={styles.name}>{Clinic.clinicName}</Text>
          <Text style={styles.role}>{Clinic.role}</Text>
          <View style={styles.ratingContainer}>
            <Star fill="#FFD700" stroke="#FFD700" width={20} height={20} />
            <Text style={styles.rating}>{Clinic.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>({Clinic.reviewsCount} reviews)</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.details}>{Clinic.bio}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Adress</Text>
            <Text style={styles.details}>{Clinic.address}</Text>
          </View>

          <TouchableOpacity style={[styles.bookButton, { marginBottom:20 }]} onPress={handleServicesPress}>
            <View style={styles.cardHeader}>
              <Text style={styles.servicesTitle}>Services</Text>
            </View>
            
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity style={styles.contactItem}>
              <Mail stroke="#4F63AC" width={20} height={20} />
              <Text style={styles.contactText}>{Clinic.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Phone stroke="#4F63AC" width={20} height={20} />
              <Text style={styles.contactText}>{Clinic.phoneNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Globe stroke="#4F63AC" width={20} height={20} />
              <Text style={styles.contactText}>{Clinic.website}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Heart fill={isFavorite ? '#FF6B6B' : 'none'} stroke={isFavorite ? '#FF6B6B' : '#4F63AC'} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <MessageCircle stroke="#FFF" width={24} height={24} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  reviewsCount: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 5,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTouchable: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  servicesTitle:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 1,
  },
  details: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  availabilityText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteButton: {
    backgroundColor: '#F0F2F5',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    backgroundColor: '#4F63AC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  bookButton: {
    backgroundColor: '#4F63AC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ModernClinicProfile;

