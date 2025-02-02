import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { ArrowRight } from 'lucide-react-native';

import DashboardProfessionalNavigator from './DashboardProfessional.js';
import AppointmentsNavigator from './BookingNavigator';
import ServicesProfessionalNavigator from './ServicesNavigator';
import SettingProfessionalScreen from '../../SCREENS/ADMIN/settings/settings';
import ProfileProfessionalScreen from '../../SCREENS/PROFESSIONAL/profile/ProfessionalProfile';
import UploadDiplomaScreen from '../../SCREENS/PROFESSIONAL/Upload/UploadDiplomaScreen.js'; // Import the new screen
import Header from '../../SCREENS/PROFESSIONAL/components/Header.jsx';
import { db } from '../../FIREBASE/config';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  
  const handleLogout = () => {
    navigation.replace('Auth');
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfessionalNavigator = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userStatus, setUserStatus] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const user = route.params?.user;
  const userG = getAuth().currentUser;
  const userId = userG ? userG.uid : null;

  const fetchUserStatus = useCallback(async () => {
    if (userId) {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const status = userDoc.data().IsVerified;
          setUserStatus(status);
          setShowBanner(status === 'Pending');
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  useFocusEffect(
    useCallback(() => {
      fetchUserStatus();
    }, [fetchUserStatus])
  );

  const handleUploadDiploma = () => {
    navigation.navigate('Upload Diploma');
  };

  const CustomNavigator = ({ navigation, route }) => {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={route.name}
          onMenuPress={() => navigation.toggleDrawer()}
        />
        {showBanner && route.name !== 'Profile' && (
          <TouchableOpacity style={styles.banner} onPress={handleUploadDiploma}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>
                Your account is pending. Please upload your diploma files.
              </Text>
              <ArrowRight color="#FFFFFF" size={20} />
            </View>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, pointerEvents: userStatus === 'Pending' ? 'none' : 'auto' }}>
          {route.name === 'Dashboard' && <DashboardProfessionalNavigator />}
          {route.name === 'Appointments' && <AppointmentsNavigator />}
          {route.name === 'Services' && <ServicesProfessionalNavigator />}
          {route.name === 'Settings' && <SettingProfessionalScreen />}
          {route.name === 'Profile' && <ProfileProfessionalScreen />}
          {route.name === 'Upload Diploma' && <UploadDiplomaScreen />}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFF',
          width: 250,
        },
        drawerActiveTintColor: '#4F63AC',
        drawerInactiveTintColor: '#888',
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        header: () => null, // Remove default header
      }}
      initialParams={{ user }}
    >
      <Drawer.Screen name="Dashboard">
        {(props) => <CustomNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Appointments">
        {(props) => <CustomNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Services">
        {(props) => <CustomNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {(props) => <CustomNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {(props) => <CustomNavigator {...props} />}
      </Drawer.Screen>

      {/* Conditionally render UploadDiplomaScreen */}
      {userStatus === 'Pending' && (
        <Drawer.Screen name="Upload Diploma">
          {(props) => <UploadDiplomaScreen {...props} />}
        </Drawer.Screen>
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  drawerContainer: {
    flex: 1,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  logoutText: {
    color: '#4F63AC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#4F63AC',
    paddingBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 19,
    borderRadius: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
});

export default ProfessionalNavigator;