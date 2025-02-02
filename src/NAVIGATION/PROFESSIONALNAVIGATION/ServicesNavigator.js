import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import ServicesScreen from '../../SCREENS/PROFESSIONAL/services/servicesPage';
import ServicesDetailsScreen from '../../SCREENS/PROFESSIONAL/services/serviceDetails';


const Stack = createStackNavigator ();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ServicesScreen">
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen name="ServicesDetailsScreen" component={ServicesDetailsScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
