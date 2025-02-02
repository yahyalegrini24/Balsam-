import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DashboardClinicNavigator from './DashboardClinic';
import AppointmentsNavigator from './BookingNavigator';
import ServicesClinicNavigator from './ServicesNavigator';
import SettingClinicScreen from '../../SCREENS/ADMIN/settings/settings';
import ProfileClinicScreen from '../../SCREENS/CLINIC/profile/ClinicProfile';
import AdminHeader from '../../SCREENS/ADMIN/components/header';
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

const ClinicNavigator = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
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
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
      } finally {
        setLoading(false);
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

  const CustomNavigator = ({ navigation, route }) => {
    return (
      <SafeAreaView style={styles.container}>
        <AdminHeader
          title={route.name}
          onMenuPress={() => navigation.toggleDrawer()}
        />
        {/* Show a message if the user's status is "Pending" */}
        {userStatus === 'Pending' && (
          <View style={styles.pendingBanner}>
            <Text style={styles.pendingText}>
              Your account is pending verification. Please wait until your account is verified.
            </Text>
          </View> 
        )}
        <View style={{ flex: 1, pointerEvents: userStatus === 'Pending' ? 'none' : 'auto' }}>
          {route.name === 'Dashboard' && <DashboardClinicNavigator />}
          {route.name === 'Appointments' && <AppointmentsNavigator />}
          {route.name === 'Services' && <ServicesClinicNavigator />}
          {route.name === 'Settings' && <SettingClinicScreen />}
          {route.name === 'Profile' && <ProfileClinicScreen />}
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
  pendingBanner: {
    backgroundColor: '#FFEB3B', // Yellow background for the banner
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingText: {
    fontSize: 14,
    color: '#000', // Black text for better visibility
    textAlign: 'center',
  },
});

export default ClinicNavigator;