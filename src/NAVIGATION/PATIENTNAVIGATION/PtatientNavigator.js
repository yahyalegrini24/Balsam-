import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

// screens importation
import HomePage from '../../SCREENS/PATIENT/HomePage/HomePage'
import ServicesPage from "../../SCREENS/PATIENT/Services/ServicePage";
import ServiceDetailsScreen from "../../SCREENS/PATIENT/Services/ServiceDetails";
import ProfessionalistScreen from "../../SCREENS/PATIENT/Professional/ListProfessional";
import ProfessionalProfile from "../../SCREENS/PATIENT/Professional/ProfessioalProfile";
import BookingsScreen from "../../SCREENS/PATIENT/booking/BookingsScreen";
import BookingDetailsScreen from "../../SCREENS/PATIENT/booking/BokingDetails";
import PaymentScreen from "../../SCREENS/PATIENT/Payment/PaymentScreen";
import MessagesScreen from "../../SCREENS/PATIENT/chat/ChatScreen";
import MessageDetailsScreen from '../../SCREENS/PATIENT/chat/message'
import ClinicListScreen from '../../SCREENS/PATIENT/Clinic/ClinicListPage'
import ClinicProfile from '../../SCREENS/PATIENT/Clinic/ClinicProfile'
import NearbyProfessionals from "../../SCREENS/PATIENT/Professional/nearbyProfessional";
import NearbyClinic from '../../SCREENS/PATIENT/Clinic/NearbyClinic'
import EmergencyScreen from '../../SCREENS/PATIENT/emergency/EmergencyScreen'
import NotificationScreen from '../../SCREENS/PATIENT/notifications/NotificationsPage'
import ProfileScreen from "../../SCREENS/PATIENT/Profile/Profile";
import PlusNavigator from './PlusNavigator'
import AIchat from '../../SCREENS/PATIENT/components/LlamaChat'
import ProServicesList from '../../SCREENS/PATIENT/Professional/ProServicesList'
import CliServicesList from '../../SCREENS/PATIENT/Clinic/CliServicesList'


const Stack = createNativeStackNavigator();

const PatientStack = () => {
  const route = useRoute();
  const user = route.params?.user;

  return (
    <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} initialParams={{ user }} />
      <Stack.Screen name="ServicesPage" component={ServicesPage} initialParams={{ user }} />
      <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} initialParams={{ user }} />
      <Stack.Screen name="ProfessionalList" component={ProfessionalistScreen} initialParams={{ user }} />
      <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfile} initialParams={{ user }} />
      <Stack.Screen name="ProServicesList" component={ProServicesList} initialParams={{ user }} />
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} initialParams={{ user }} />
      <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} initialParams={{ user }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} initialParams={{ user }} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} initialParams={{ user }} />
      <Stack.Screen name="MessageDetailsScreen" component={MessageDetailsScreen} initialParams={{ user }} />
      <Stack.Screen name="ClinicListScreen" component={ClinicListScreen} initialParams={{ user }} />
      <Stack.Screen name="ClinicProfile" component={ClinicProfile} initialParams={{ user }} />
      <Stack.Screen name="CliServicesList" component={CliServicesList} initialParams={{ user }} />
      <Stack.Screen name="NearbyProfessionals" component={NearbyProfessionals} initialParams={{ user }} />
      <Stack.Screen name="NearbyClinic" component={NearbyClinic} initialParams={{ user }} />
      <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} initialParams={{ user }} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} initialParams={{ user }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{ user }} />
      <Stack.Screen name="PlusNavigator" component={PlusNavigator} initialParams={{ user }} />
      <Stack.Screen name="AIchat" component={AIchat} initialParams={{ user }} />
    </Stack.Navigator>
  );
};

export default PatientStack;