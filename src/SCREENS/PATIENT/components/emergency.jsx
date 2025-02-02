import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Get screen width and height
const { width, height } = Dimensions.get('window');

export default function Emergency() {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('EmergencyScreen');
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../../assets/images/emergency.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  touchable: {
    // Remove specific height or width
  },
  image: {
    width: width * 0.9, // Set image width to 90% of the screen width
    height: height * 0.3, // Set image height to 30% of the screen height
    resizeMode: 'cover', // Ensures the image covers the container area properly
  },
});
