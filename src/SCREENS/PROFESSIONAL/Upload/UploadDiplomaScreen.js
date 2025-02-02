import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Upload, X, Check, FileText } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadFilePage = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: false,
        multiple: true
      });

      if (result.type === 'success') {
        setFiles([...files, result]);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    // Implement the actual file upload logic here
    Alert.alert('Success', 'Files uploaded successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Upload Diploma Files</Text>
          <Text style={styles.description}>Please upload your diploma files to verify your account.</Text>
        </View>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
            <Upload color="#4F63AC" size={48} />
            <Text style={styles.uploadText}>Tap to select files</Text>
            <Text style={styles.uploadSubtext}>Supported formats: PDF, JPG, PNG</Text>
          </TouchableOpacity>
          
          {files.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <FileText color="#4F63AC" size={24} />
              <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                {file.name}
              </Text>
              <TouchableOpacity onPress={() => removeFile(index)}>
                <X color="#FF4136" size={24} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={[styles.button, files.length === 0 && styles.buttonDisabled]}
            onPress={handleUpload}
            disabled={files.length === 0}
          >
            <Check color="#FFFFFF" size={20} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Upload Files</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F63AC',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
  cardContent: {
    padding: 16,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#4F63AC',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4F63AC',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  fileName: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  button: {
    backgroundColor: '#4F63AC',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UploadFilePage;

