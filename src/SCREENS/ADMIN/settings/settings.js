import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';

const AdminSettingsScreen = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* General Settings */}
      <Text style={styles.sectionTitle}>General Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>App Theme (Dark Mode)</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Select Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Timezone</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Set Timezone</Text>
        </TouchableOpacity>
      </View>

      {/* User Management Settings */}
      <Text style={styles.sectionTitle}>User Management</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Default Roles</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Roles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Account Approval Flow</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Configure</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Session Management</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Sessions</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Settings */}
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Email Alerts</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Application Management */}
      <Text style={styles.sectionTitle}>Application Management</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Feature Toggles</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Configure Features</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Backup Settings</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Manage Backups</Text>
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <Text style={styles.sectionTitle}>Danger Zone</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Reset App to Defaults</Text>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
          <Text style={styles.actionButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Delete All App Data</Text>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dangerButton: {
    backgroundColor: '#FF4500',
  },
});

export default AdminSettingsScreen;
