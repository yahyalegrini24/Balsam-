import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Footer from '../components/BottomNavigationBar'
const { width } = Dimensions.get("window");

const plusOptions = [
  { id: "1", name: "Profile", icon: "account", screen: "ProfileScreen" },
  { id: "2", name: "Settings", icon: "cog", screen: "PatientSettingsScreen" },
  { id: "3", name: "Support", icon: "help-circle-outline", screen: "SupportScreen" },
  { id: "4", name: "Log Out", icon: "logout", screen: "Auth" },
  
];

const PlusScreen = ({ navigation }) => {
  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Icon name={item.icon} size={30} color="#4A90E2" style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.name}</Text>
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
          <Text style={styles.headerTitle}>Plus Section</Text>
        </View>
      </View>

      <FlatList
        data={plusOptions}
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
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});

export default PlusScreen;
