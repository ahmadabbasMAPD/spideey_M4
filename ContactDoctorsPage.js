import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactDoctorsPage = ({ route }) => {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.contactInfo}>Contact Information for {doctor.name}</Text>
      <Text style={styles.contactDetails}>Email: {doctor.email}</Text>
      <Text style={styles.contactDetails}>Phone: {doctor.phone}</Text>
      <Text style={styles.additionalInfo}>Additional Contact Information:</Text>
      {/* Add any additional contact information you want to display */}
      <Text style={styles.additionalContactDetails}>Hospital: {doctor.hospital}</Text>
      <Text style={styles.additionalContactDetails}>Address: {doctor.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF5E6', // Old Lace background
    padding: 20,
  },
  contactInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E2A1D', // Dark Brown text
    marginBottom: 10,
  },
  contactDetails: {
    fontSize: 16,
    color: '#1D3557', // Dark Blue text
    marginBottom: 5,
  },
  additionalInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E4095', // Dark Purple text
    marginTop: 20,
  },
  additionalContactDetails: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 10,
  },
});

export default ContactDoctorsPage;
