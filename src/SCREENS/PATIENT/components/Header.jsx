import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function Header({ user }) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerBackground}>
      {/* Profile Picture and Greeting */}
      <View style={styles.headerContent}>
       <TouchableOpacity
       onPress={()=>navigation.navigate("ProfileScreen")}
       >
          <Image
            style={styles.profilePic}
            source={{
              uri: user?.avatarUrl || "https://via.placeholder.com/150", // Fallback to placeholder if avatar URL is unavailable
            }}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Hi, {user?.name || "Guest"}</Text>
        </View>

        {/* Notification Icon */}
        <TouchableOpacity style={styles.notificationIconContainer} onPress={()=> navigation.navigate('NotificationScreen')}>
          <Ionicons name="notifications-outline" size={24} color="#4F63AC" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A9A9A9" />
        <TextInput
          style={styles.searchInput}
          placeholder="Find Doctor, Clinic, Medicine"
          placeholderTextColor="#A9A9A9"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: "#4F63AC",
    borderBottomLeftRadius: width * 0.1, // Make it relative to screen width
    borderBottomRightRadius: width * 0.1,
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: height * 0.03,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between profile and notification icon
    paddingTop: height * 0.03,
  },
  textContainer: {
    flex: 1,
    marginLeft: width * 0.03,
  },
  greeting: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: "bold",
    color: "#FFF",
  },
  profilePic: {
    width: width * 0.12, // Responsive profile picture size
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 50,
    paddingHorizontal: width * 0.04, // Responsive padding
    marginTop: height * 0.02,
    height: height * 0.06, // Responsive height
    alignSelf: "center",
    width: "80%", // Use a percentage for the width
    bottom:-15
  },
  searchInput: {
    flex: 1,
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    color: "#333",
  },
  notificationIconContainer: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
