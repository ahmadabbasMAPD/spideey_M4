import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const UpdatedCriticalInfoScreen = ({ route, navigation }) => {
  const {
    respiratoryRate,
    bloodPressure,
    oxygenSaturation,
    heartRate,
    bodyTemperature,
    inputText,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Updated Critical Information</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Respiratory Rate:</Text>
          <Text style={styles.value}>{respiratoryRate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Blood Pressure:</Text>
          <Text style={styles.value}>{bloodPressure}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Oxygen Saturation:</Text>
          <Text style={styles.value}>{oxygenSaturation || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Heart Rate:</Text>
          <Text style={styles.value}>{heartRate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Body Temperature:</Text>
          <Text style={styles.value}>{bodyTemperature}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Doctor's Note:</Text>
          <Text style={styles.noteText}>{inputText}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          // Pass the updated critical information back to PatientDetails
          navigation.navigate('PatientDetails', {
            updatedCriticalInfo: {
              respiratoryRate,
              bloodPressure,
              oxygenSaturation,
              heartRate,
              bodyTemperature,
              inputText,
            },
          });
        }}
      >
        <Text style={styles.goBackButtonText}>Go Back to Patient Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
    color: '#333333',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008080',
  },
  value: {
    fontSize: 18,
    color: '#800080',
  },
  noteText: {
    flex: 1,
    fontSize: 18,
    color: '#FF4500',
    marginLeft: 10,
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UpdatedCriticalInfoScreen;
