import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../FIREBASE/config';
import { Ionicons } from '@expo/vector-icons';

export default function ManageUsers({ navigation }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('All'); // 'All', 'Pending', 'Active'
  const [loading, setLoading] = useState(true);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
      setFilteredUsers(usersList); // Initially show all users
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on status
  useEffect(() => {
    if (filter === 'All') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.IsVerified === filter);
      setFilteredUsers(filtered);
    }
  }, [filter, users]);

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
      Alert.alert('Success', 'User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user.');
    }
  };

  // Update user status (Accept/Refuse)
  const handleUpdateStatus = async (userId, status) => {
    try {
      await updateDoc(doc(db, 'users', userId), { IsVerified: status });
      setUsers(users.map((user) => (user.id === userId ? { ...user, IsVerified: status } : user)));
      Alert.alert('Success', `User status updated to ${status}.`);
    } catch (error) {
      console.error('Error updating user status:', error);
      Alert.alert('Error', 'Failed to update user status.');
    }
  };

  // Render each user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userRole}>Role: {item.role}</Text>
      
      </View>
      <View style={styles.actions}>
        
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
        {item.IsVerified === 'Pending' && (
          <>
            <TouchableOpacity onPress={() => handleUpdateStatus(item.id, 'Active')}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#00C851" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdateStatus(item.id, 'Refused')}>
              <Ionicons name="close-circle-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
          onPress={() => setFilter('All')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Pending' && styles.activeFilter]}
          onPress={() => setFilter('Pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Active' && styles.activeFilter]}
          onPress={() => setFilter('Active')}
        >
          <Text style={styles.filterText}>Active</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4c669f" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#4c669f',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});