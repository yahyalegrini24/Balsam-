import React from "react";
import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlusScreen from "../../SCREENS/PATIENT/plus/PlusScreen";
import ProfileScreen from "../../SCREENS/PATIENT/Profile/Profile";
import PatientSettingsScreen from "../../SCREENS/PATIENT/plus/SettingScreen";


const Stack = createNativeStackNavigator();

const PlusNavigator = () => {
  const route = useRoute();
    const user = route.params?.user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Plus" component={PlusScreen} initialParams={{ user }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ user }} />
      <Stack.Screen name="PatientSettingsScreen" component={PatientSettingsScreen} initialParams={{ user }} />
      
    </Stack.Navigator>
  );
};

export default PlusNavigator;
