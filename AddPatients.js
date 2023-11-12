import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddPatients = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [highlightedFields, setHighlightedFields] = useState([]);
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    phoneNumber: '',
  });

  const handleAddPatient = async () => {
    // Identify empty fields
    const emptyFields = [];
    const errors = { ...errorMessages };

    if (!name) {
      emptyFields.push('name');
      errors.name = 'Name is required.';
    }

    if (!age) {
      emptyFields.push('age');
      errors.age = 'Age is required.';
    }

    if (!gender) {
      emptyFields.push('gender');
      errors.gender = 'Gender is required.';
    }

    if (!address) {
      emptyFields.push('address');
      errors.address = 'Address is required.';
    }

    if (!phoneNumber) {
      emptyFields.push('phoneNumber');
      errors.phoneNumber = 'Phone Number is required.';
    }

    // Highlight empty fields and set error messages
    setHighlightedFields(emptyFields);
    setErrorMessages(errors);

    // Validate that all fields are entered
    if (emptyFields.length > 0) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/Patients', {
        name,
        age,
        gender,
        address,
        phno: phoneNumber,
      });

      if (response.data) {
        const patientID = response.data._id;
        console.log('New patient added with ID:', response.data._id);
        Alert.alert('Patient Added', 'Patient details successfully added.');
        navigation.navigate('CareProviderHomePage', { patientID },{
          addedPatient: response.data,
          patientID: response.data._id,
        });
      } else {
        Alert.alert('Error', 'Failed to add patient. Please try again.');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      Alert.alert('Error', 'Failed to add patient. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Patients</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            highlightedFields.includes('name') && styles.highlighted,
          ]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {highlightedFields.includes('name') && (
          <Text style={styles.errorText}>{errorMessages.name}</Text>
        )}

        <TextInput
          style={[
            styles.input,
            highlightedFields.includes('age') && styles.highlighted,
          ]}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        {highlightedFields.includes('age') && (
          <Text style={styles.errorText}>{errorMessages.age}</Text>
        )}

        <TextInput
          style={[
            styles.input,
            highlightedFields.includes('gender') && styles.highlighted,
          ]}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
        />
        {highlightedFields.includes('gender') && (
          <Text style={styles.errorText}>{errorMessages.gender}</Text>
        )}

        <TextInput
          style={[
            styles.input,
            highlightedFields.includes('address') && styles.highlighted,
          ]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        {highlightedFields.includes('address') && (
          <Text style={styles.errorText}>{errorMessages.address}</Text>
        )}

        <TextInput
          style={[
            styles.input,
            highlightedFields.includes('phoneNumber') && styles.highlighted,
          ]}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        {highlightedFields.includes('phoneNumber') && (
          <Text style={styles.errorText}>{errorMessages.phoneNumber}</Text>
        )}
      </View>
      <Button title="Add Patient" onPress={handleAddPatient} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#4CAF50',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  highlighted: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default AddPatients;
