import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMetrics } from '../../../SERVICES/MetricsServices';
import { getAuth } from "firebase/auth";

const MetricsScreen = () => {
  const [keyMetrics, setKeyMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
 const user = getAuth().currentUser;
  const userId = user ? user.uid : null;


  

  const fetchMetrics = async () => {
    try {
      const metrics = await getMetrics();
      setKeyMetrics(metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMetrics();
  };

  const renderItem = ({ item }) => (
    <View style={styles.metricCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
      ) : (
        <Icon name={item.icon} size={30} color="#4A90E2" />
      )}
      <Text style={styles.metricValue}>{item.value}</Text>
      <Text style={styles.metricTitle}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <FlatList
      data={keyMetrics}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.sectionTitle}>Key Metrics</Text>}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#4A90E2']}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  metricTitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MetricsScreen;
