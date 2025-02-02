import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import BookingScreen from '../../SCREENS/CLINIC/booking/BookingPage';
import BookingDetailsScreen from '../../SCREENS/CLINIC/booking/BookingDetails';
import PatientProfile from '../../SCREENS/CLINIC/booking/PatientProfile';


const Stack = createStackNavigator ();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BookingScreen">
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      
      
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
