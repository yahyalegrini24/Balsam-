import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import DashboardStackNavigator from './DashboardNavigator';
import AdminSettingsScreen from '../../SCREENS/ADMIN/settings/settings';
import AdminProfileScreen from '../../SCREENS/ADMIN/profile/profile';
import AdminHeader from '../../SCREENS/ADMIN/components/header';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";



const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
  const navigation =useNavigation();
 
  const handleLogout = () => {
    console.log('Logging out...');
    navigation.replace('Auth')
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

const AdminNavigator = () => {
  const route = useRoute();
  const user = route.params?.user;

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        header: () => (
          <AdminHeader
            title={route.name}
            onMenuPress={() => navigation.toggleDrawer()}
          />
        ),
        drawerStyle: {
          backgroundColor: '#FFF',
          width: 250,
        },
        drawerActiveTintColor: '#4F63AC',
        drawerInactiveTintColor: '#888',
      })}
      initialParams={{ user }} 
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{
          drawerLabel: 'Dashboard',
          title: 'Admin Dashboard',
        }}
        initialParams={{ user }} 
      />
      <Drawer.Screen
        name="Settings"
        component={AdminSettingsScreen}
        options={{
          drawerLabel: 'Settings',
          title: 'Admin Settings',
        }}
        initialParams={{ user }} 
      />
      <Drawer.Screen
        name="Profile"
        component={AdminProfileScreen}
        options={{
          drawerLabel: 'Profile',
          title: 'Admin Profile',
        }}
        initialParams={{ user }} 
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutText: {
    color: '#4F63AC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminNavigator;

