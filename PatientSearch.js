import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PatientProfile = ({name, age, gender, address}) => (
  <View style={{ flexDirection: 'row', margin: 10 }}>
    <Image source={require('./assets/profile_image.jpeg')} style={styles.image} />
    <View style={{ marginLeft: 10 }}>
      <Text>{name}</Text>
      <Text>Age: {age} yrs</Text>
      <Text>Gender: {gender}</Text>
      <Text>Address: {address}</Text>
    </View>
  </View>
);
// PatientDetails 
const PatientDetails = ({ navigation }) => {
  
    const [isLoading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/Patients')
        .then((response) => response.json())
        .then((json) => setPatients(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
  

  return (
    <View>
      <TextInput placeholder="Search Patients here..." />
      {patients.map((patient, index) => (
        <PatientProfile key={index} {...patient} />
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {/* Replace 'icon_name' with your icon */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPatientDetails')}>
          <Text style={styles.buttonText}>Add Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CareProviderHomePage')}>
          <Text style={styles.buttonText}>Care Provider Home Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
});

export default PatientDetails;
