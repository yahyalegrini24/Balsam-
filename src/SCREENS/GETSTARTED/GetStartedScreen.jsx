import React from "react";
import { View, TouchableOpacity, ImageBackground, Text ,StatusBar} from "react-native";
import styles from './style';  // Ensure correct import

export default function GetStartedScreen({ onGetStarted }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/images/test.jpg')} // Ensure correct path to your image
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          {/* Empty space to push the button down */}
          <View style={styles.spacer} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onGetStarted(); // Trigger transition
            }} // Add navigation logic
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
