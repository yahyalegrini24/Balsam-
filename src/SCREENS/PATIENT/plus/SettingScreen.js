import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Footer from '../components/BottomNavigationBar'

const { width } = Dimensions.get("window");

const settingsOptions = [
  { id: "1", name: "Notifications", icon: "bell-outline", type: "switch" },
  { id: "2", name: "Medication Reminders", icon: "pill", type: "switch" },
  { id: "3", name: "Share Location", icon: "map-marker-outline", type: "switch" },
  { id: "4", name: "Personal Information", icon: "account-outline", type: "navigate", screen: "Profile" },
  { id: "5", name: "Privacy Settings", icon: "shield-account-outline", type: "navigate", screen: "PrivacySettingsScreen" },
  { id: "6", name: "Help Center", icon: "help-circle-outline", type: "navigate", screen: "HelpCenterScreen" },
  { id: "7", name: "Contact Support", icon: "phone-outline", type: "navigate", screen: "ContactSupportScreen" },
];

const PatientSettingsScreen = ({ navigation }) => {
  const [switchValues, setSwitchValues] = React.useState({
    "1": true,
    "2": true,
    "3": false,
  });

  const handleSwitchToggle = (id) => {
    setSwitchValues(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => item.type === "navigate" && navigation.navigate(item.screen)}
    >
      <Icon name={item.icon} size={30} color="#4A90E2" style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.name}</Text>
      {item.type === "switch" ? (
        <Switch
          value={switchValues[item.id]}
          onValueChange={() => handleSwitchToggle(item.id)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={switchValues[item.id] ? "#4A90E2" : "#f4f3f4"}
        />
      ) : (
        <Icon name="chevron-right" size={24} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Patient Settings</Text>
          </View>
        </View>

        <FlatList
          data={settingsOptions}
          renderItem={renderOption}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.optionsContainer}
        />
      </View>
      <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#4F63AC",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  optionsContainer: {
    padding: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});

export default PatientSettingsScreen;

