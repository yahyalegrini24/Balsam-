import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../../FIREBASE/config';
import { collection, addDoc } from 'firebase/firestore';

const AddServiceScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [icon, setIcon] = useState('stethoscope'); // Default icon
  const [included, setIncluded] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleAddService = async () => {
    if (
      !title ||
      !category ||
      !description ||
      !duration ||
      !icon ||
      !included ||
      !location ||
      !price ||
      !cancellationPolicy
    ) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    setLoading(true);

    try {
      // Convert included string to array
      const includedArray = included.split(',').map((item) => item.trim());

      // Add new service to Firestore
      await addDoc(collection(db, 'services'), {
        title,
        category,
        description,
        duration,
        icon,
        included: includedArray,
        location,
        price,
        cancellationPolicy,
      });

      Alert.alert('Success', 'Service added successfully!');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error('Error adding service:', error);
      Alert.alert('Error', 'Failed to add service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Service</Text>

      {/* Title */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Category */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      {/* Description */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Duration */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter duration (e.g., 30-60 min)"
          value={duration}
          onChangeText={setDuration}
        />
      </View>

      {/* Icon */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Icon</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter icon name (e.g., stethoscope)"
          value={icon}
          onChangeText={setIcon}
        />
      </View>

      {/* Included */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Included (comma-separated)</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter included services (e.g., Physical examination, Blood pressure check)"
          value={included}
          onChangeText={setIncluded}
          multiline
        />
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Price */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price (e.g., 2000-4000 DZD)"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      {/* Cancellation Policy */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cancellation Policy</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter cancellation policy"
          value={cancellationPolicy}
          onChangeText={setCancellationPolicy}
          multiline
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddService}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Add Service</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F63AC',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4F63AC',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddServiceScreen;