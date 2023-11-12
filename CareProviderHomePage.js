import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Patient = ({ _id, name, phno, address, age, gender, navigateToPatientDetails, saveTestData }) => (
  <TouchableOpacity key={_id} onPress={() => navigateToPatientDetails(_id, saveTestData)}>
    <View style={styles.patientDetails}>
      <View style={styles.patientText}>
        <Text style={styles.patientName}>{name}</Text>
        <Text style={styles.patientInfo}>Phone Number: {phno}</Text>
        <Text style={styles.patientInfo}>Age: {age}</Text>
        <Text style={styles.patientInfo}>Address: {address}</Text>
        <Text style={styles.patientInfo}>Gender: {gender}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CareProviderHomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [patientDetails, setPatientDetails] = useState([]);

  const searchPatient = async () => {
    try {
      const trimmedId = searchQuery.trim();

      // Validate the ID format
      if (!/^[a-zA-Z0-9]+$/.test(trimmedId)) {
        Alert.alert('Error', 'Invalid ID format. Please enter a valid ID.');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:5000/Patients/${trimmedId}`);
      setPatientDetails([response.data]);
    } catch (error) {
      console.error('Failed to fetch patient by ID:', error);

      if (error.response && error.response.status === 404) {
        // Display user-friendly error message using Alert for a 404 (Not Found) response
        Alert.alert('Error', 'Patient not found. Please enter a valid ID.');
      } else {
        // Handle other errors or show a generic error message
        Alert.alert('Error', 'Failed to fetch patient details. Please try again later.');
      }

      setPatientDetails([]);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/Patients`);
      setPatientDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchPatient();
    } else {
      // Clear the search results when the search query is empty
      fetchPatients();
    }
  }, [searchQuery]);

  const navigateToAddinfoScreen = (id, saveTestData) => {
    navigation.navigate('AddInfoScreen', { patientID: id, saveTestData });
  };

  const navigateToPatientDetails = (id, saveTestData) => {
    navigation.navigate('PatientDetails', { patientID: id, saveTestData });
  };

  const addPatientToState = (patient) => {
    setPatientDetails([...patientDetails, patient]);
  };

  const deleteAllPatients = () => {
    Alert.alert(
      'Delete All Patients',
      'Are you sure you want to delete all patients?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Make a DELETE request to the server endpoint
              const response = await axios.delete('http://127.0.0.1:5000/Patients');

              if (response.status === 200) {
                // If successful, update the state to reflect the deletion
                setPatientDetails([]);
              } else {
                // Handle other status codes or show an error message
                console.error('Failed to delete patients:', response.data);
                Alert.alert('Error', 'Failed to delete patients. Please try again later.');
              }
            } catch (error) {
              console.error('Error deleting patients:', error);
              Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('./assets/profile_image.jpeg')} style={styles.profileImage} />
        <Text style={styles.profileName}>Care Provider</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.criticalPatients}>All Patients</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Patient Id"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={searchPatient}
      />
      <View style={styles.patientContainer}>
        {patientDetails.map((patient) => (
          <Patient
            key={patient._id}
            {...patient}
            navigateToPatientDetails={navigateToPatientDetails}
            saveTestData={() => saveTestData(patient._id)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.addPatientButton}
        onPress={() => navigation.navigate('AddPatients', { onAddPatient: addPatientToState })}
      >
        <Text style={styles.addPatientButtonText}>Add Patients</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteAllPatientsButton} onPress={deleteAllPatients}>
        <Text style={styles.deleteAllPatientsButtonText}>Delete All Patients</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginRight: 100,
  },
  divider: {
    borderBottomColor: '#C8E6C9',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 20,
  },
  criticalPatients: {
    color: 'red',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  patientContainer: {
    width: '100%',
  },
  patientDetails: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  patientImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  patientText: {
    flex: 1,
  },
  patientName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF4081',
    textAlign: 'center',
    marginBottom: 10,
  },
  patientInfo: {
    fontSize: 14,
    color: '#FF6E40',
    textAlign: 'center',
  },
  addPatientButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  addPatientButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteAllPatientsButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  deleteAllPatientsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CareProviderHomePage;
