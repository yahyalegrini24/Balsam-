import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import DashboardScreen from '../../SCREENS/ADMIN/dashboard/dashboard';
import MetricsScreen from '../../SCREENS/ADMIN/dashboard/Metrics';
import ManageUsers from '../../SCREENS/ADMIN/dashboard/ManageUsers';
import ManageContent from '../../SCREENS/ADMIN/dashboard/ManageContent';
import AddServiceScreen from '../../SCREENS/ADMIN/dashboard/AddServicesScreen';
import ManageBookings from '../../SCREENS/ADMIN/dashboard/ManageBookings';

import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator ();

const DashboardStackNavigator = () => {
   const route = useRoute();
      const user = route.params?.user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DashboardMain">
      <Stack.Screen name="DashboardMain" component={DashboardScreen} initialParams={{ user }} />
      <Stack.Screen name="Metrics" component={MetricsScreen}initialParams={{ user }}  />
      <Stack.Screen name="ManageUsers" component={ManageUsers}initialParams={{ user }}  />
      <Stack.Screen name="ManageContent" component={ManageContent}initialParams={{ user }}  />
      <Stack.Screen name="AddServiceScreen" component={AddServiceScreen}initialParams={{ user }}  />
      <Stack.Screen name="ManageBookings" component={ManageBookings}initialParams={{ user }}  />
    
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
