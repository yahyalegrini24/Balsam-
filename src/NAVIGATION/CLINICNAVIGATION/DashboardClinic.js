import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import DashboardScreen from '../../SCREENS/CLINIC/dashboard/Dashboard';


const Stack = createStackNavigator ();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DashboardClinic">
      <Stack.Screen name="DashboardClinic" component={DashboardScreen} />
      
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
