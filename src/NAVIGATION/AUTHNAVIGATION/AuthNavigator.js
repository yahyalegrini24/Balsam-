
// src/navigation/AuthNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../SCREENS/AUTH/LoginScreen"; // Import the AuthScreen
import SignUpNavigator from "./SignUpNavigator"; // Import the AuthScreen


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpNavigator" component={SignUpNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;



