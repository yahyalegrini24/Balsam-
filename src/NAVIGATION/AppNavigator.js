import React,{useState} from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientNavigator from './PATIENTNAVIGATION/PtatientNavigator';
import AdminNavigator from './ADMINNAVIGATION/AdminNavigator';
import AuthNavigator from './AUTHNAVIGATION/AuthNavigator';
import GetStartedScreen from "../SCREENS/GETSTARTED/GetStartedScreen";
import ClinicNavigator from "./CLINICNAVIGATION/ClinicNavigator";
import ProfessionalNavigator from "./PROFESSIONALNAVIGATION/ProfessionalNavigator";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  const [isGetStarted, setIsGetStarted] = useState(true);

  // Simulating the initial role determination after GetStarted
  const handleGetStarted = () => {
    setIsGetStarted(false); // Mark GetStarted as completed
  };


  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isGetStarted ? (
        <Stack.Screen
          name="GetStarted"
          component={(props) => <GetStartedScreen {...props} onGetStarted={handleGetStarted} />}
        />
      ) : (
        <>
        <Stack.Screen name="Auth" component={AuthNavigator} />
     
        <Stack.Screen name="Patient" component={PatientNavigator} />
      
        <Stack.Screen name="Admin" component={AdminNavigator} />
        
        <Stack.Screen name="Clinic" component={ClinicNavigator} />

        <Stack.Screen name="Professional" component={ProfessionalNavigator} />

       
        
        
        </>
      )
      }
    </Stack.Navigator>
  );
};

export default AppNavigator;
