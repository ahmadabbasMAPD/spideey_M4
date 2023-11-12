import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DoctorDetails = ({ route }) => {
  const { doctor } = route.params;
  const navigation = useNavigation();

  const handleContactPress = () => {
    // Navigate to the ContactDoctorsPage with doctor's contact information
    navigation.navigate('ContactDoctorsPage', { doctor });
  };

  return (
    <View style={styles.container}>
      <Image source={doctor.image} style={styles.profileImage} />
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <Text style={styles.specialization}>{doctor.specialization}</Text>
      <Text style={styles.rating}>Rating: {doctor.rating}</Text>
      <Text style={styles.contact}>Contact: {doctor.contact}</Text>
      <Text style={styles.appointments}>Appointments: {doctor.appointments.join(', ')}</Text>
      
      <View style={styles.testsContainer}>
        <Text style={styles.testsTitle}>Recommended Tests:</Text>
        <Text style={styles.testsDetails}>1. Blood Pressure Measurement</Text>
        <Text style={styles.testsDetails}>2. Cholesterol Level Check</Text>
        <Text style={styles.testsDetails}>3. ECG (Electrocardiogram)</Text>
      </View>
      
      <TouchableOpacity
        style={styles.contactButton}
        onPress={handleContactPress}
      >
        <Text style={styles.buttonText}>Contact {doctor.specialization}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF5E6', // Old Lace background
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E2A1D', // Dark Brown text
    textAlign: 'center',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 18,
    color: '#9B1D20', // Red text
    textAlign: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#4CAF50', // Green text
    marginBottom: 10,
  },
  contact: {
    fontSize: 14,
    color: '#1D3557', // Dark Blue text
    marginBottom: 10,
  },
  appointments: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  testsContainer: {
    marginTop: 15,
  },
  testsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E4095', // Dark Purple text
    marginBottom: 10,
  },
  testsDetails: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 10,
  },
  contactButton: {
    backgroundColor: '#3498DB', // Blue button background
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DoctorDetails;
