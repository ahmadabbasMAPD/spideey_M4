import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const PatientDetails = ({ route, navigation }) => {
  const { patientID } = route.params;
  const [patientDetails, setPatientDetails] = useState({});
  const updatedCriticalInfo = route.params?.updatedCriticalInfo;

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  useEffect(() => {
    if (updatedCriticalInfo) {
      setPatientDetails(updatedCriticalInfo);
    }
  }, [updatedCriticalInfo]);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/Patients/${patientID}`);
      if (response.data && response.data.tests && response.data.tests.length > 0) {
        const latestTest = response.data.tests[response.data.tests.length - 1];
        setPatientDetails(latestTest);
      }
    } catch (error) {
      console.error('Failed to fetch patient details:', error);
      handleFetchError();
    }
  };

  const handleFetchError = () => {
    Alert.alert(
      'Error',
      'Failed to fetch patient details. Please try again later.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Handle OK button press if needed
          },
        },
      ],
      { cancelable: false }
    );
  };

  const isCritical = (value, criticalRange) => {
    return value < criticalRange.min || value > criticalRange.max;
  };

  const handleDeleteTest = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/Patients/${patientID}/tests/${patientDetails._id}`);
      if (response.status === 200) {
        console.log('Test deleted successfully:', response.data);
        const updatedPatientDetails = response.data.updatedPatient;
        setPatientDetails(updatedPatientDetails);
        // You can perform any UI updates or navigation logic here after successful deletion
      } else {
        console.error('Failed to delete test:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting test:', error.message); // Log the detailed error message
      // Handle the error as needed
    }
  };

  const handleUpdateTests = () => {
    if (patientDetails && Object.keys(patientDetails).length > 0) {
      // If patientDetails has data, navigate to UpdateTest screen
      navigation.navigate('UpdateTest', {
        patientID,
        // Pass other necessary data to the UpdateTest screen if needed
      });
    } else {
      // If patientDetails is not available, show an alert message
      Alert.alert(
        'Data Not Provided',
        'Test data is not available for updating. Please add data first.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Handle OK button press if needed
            },
          },
        ],
        { cancelable: false }
      );
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{patientDetails.name} Details</Text>
        </View>

        <View style={styles.hr} />

        <View style={styles.rectangularContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Blood Pressure:</Text>
            <Text
              style={[
                styles.value,
                isCritical(patientDetails.bloodPressure, { min: 70, max: 120 }) && { color: 'red' },
              ]}
            >
              {patientDetails.bloodPressure} mmHg
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Heart Rate:</Text>
            <Text style={[styles.value, isCritical(patientDetails.heartRate, { min: 40, max: 100 }) && { color: 'red' }]}>
              {patientDetails.heartRate} BPM
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Respiratory Rate:</Text>
            <Text
              style={[
                styles.value,
                isCritical(patientDetails.respiratoryRate, { min: 12, max: 20 }) && { color: 'red' },
              ]}
            >
              {patientDetails.respiratoryRate} breaths/min
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Oxygen Saturation:</Text>
            <Text
              style={[
                styles.value,
                isCritical(patientDetails.oxygenSaturation, { min: 95, max: 100 }) && { color: 'red' },
              ]}
            >
              {patientDetails.oxygenSaturation || 'N/A'}%
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Body Temperature:</Text>
            <Text
              style={[
                styles.value,
                isCritical(patientDetails.bodyTemperature, { min: 97, max: 99 }) && { color: 'red' },
              ]}
            >
              {patientDetails.bodyTemperature} °C
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('AddInfoScreen', {
                patientID: patientID,
                patientName: patientDetails.name,
                age: patientDetails.age,
                phoneNumber: patientDetails.phoneNumber,
              })
            }
          >
            <Text style={styles.addButtonText}>Add Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateTests}
          >
            <Text style={styles.updateButtonText}>Update Tests</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete Test',
              'Are you sure you want to delete this test?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: handleDeleteTest,
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.deleteButtonText}>Delete Tests</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  hr: {
    borderBottomColor: '#C8E6C9',
    borderBottomWidth: 1,
    width: '80%',
    marginVertical: 20,
  },
  rectangularContainer: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008080',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PatientDetails;
