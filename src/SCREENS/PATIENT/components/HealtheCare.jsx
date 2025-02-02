import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// Get screen width and height
const { width, height } = Dimensions.get('window');

export default function HealthcareService() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} activeOpacity={0.8}
      onPress={()=> navigation.navigate("ServicesPage")}
      >
        <Image
          style={styles.image}
          source={require('../../../../assets/images/features.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20, // Add spacing to avoid overlap with other sections
  },
  touchable: {
    width: '90%', // Adjust width for responsiveness
    height: height * 0.3, // Set height as 30% of the screen height
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the container area properly
  },
});
