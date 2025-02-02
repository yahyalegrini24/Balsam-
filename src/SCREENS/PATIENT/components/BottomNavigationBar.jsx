import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Footer({ activeTab }) {
  const navigation = useNavigation(); // Access navigation object

  const tabs = [
    { name: "Home", icon: "home-outline", screen: "HomePage" },
    { name: "Services", icon: "list-outline", screen: "ServicesPage" },
    { name: "Bookings", icon: "calendar-outline", screen: "BookingsScreen" },
    { name: "Messages", icon: "chatbubble-outline", screen: "MessagesScreen" },
    { name: "Plus", icon: "menu-outline", screen: "PlusNavigator" },
  ];

  return (
    <View style={styles.footer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => navigation.navigate(tab.screen)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeTab === tab.name ? "#A9A9A9" : "white"}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === tab.name ? "#A9A9A9" : "white" },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#4F63AC",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});
