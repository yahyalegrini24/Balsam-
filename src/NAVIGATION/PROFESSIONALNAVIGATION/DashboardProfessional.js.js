import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import DashboardScreen from '../../SCREENS/PROFESSIONAL/dashboard/Dashboard';
import UploadDiplomaScreen from '../../SCREENS/PROFESSIONAL/Upload/UploadDiplomaScreen';


const Stack = createStackNavigator ();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DashboardProfessional">
      <Stack.Screen name="DashboardProfessional" component={DashboardScreen} />
      <Stack.Screen name="UploadDiplomaScreen" component={UploadDiplomaScreen} />
      
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
