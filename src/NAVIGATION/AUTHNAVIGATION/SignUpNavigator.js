
// src/navigation/AuthNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleScreen from "../../SCREENS/AUTH/RoleScreen"; // Import the AuthScreen
import InformationsScreen from "../../SCREENS/AUTH/PatientInformationsScreen"; // Import the AuthScreen
import ClinicInformationsScreen from "../../SCREENS/AUTH/ClinicInformationsScreen"; // Import the AuthScreen
import ProfessionalInformationsScreen from "../../SCREENS/AUTH/ProfessionalInformationsScreen"; // Import the AuthScreen



const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RoleScreen">
      <Stack.Screen name="RoleScreen" component={RoleScreen} />
      <Stack.Screen name="PatientInformationsScreen" component={InformationsScreen} />
      <Stack.Screen name="ClinicInformationsScreen" component={ClinicInformationsScreen} />
      <Stack.Screen name="ProfessionalInformationsScreen" component={ProfessionalInformationsScreen} />
      
    </Stack.Navigator>
  );
};

export default SignUpNavigator;



