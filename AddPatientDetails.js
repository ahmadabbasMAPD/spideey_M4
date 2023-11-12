import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const AddPatientDetails = ({name, phone, bloodPressure, respiratoryRate, bloodOxygenLevel}) => (
  <View style={{ margin: 10 }}>
     <Image
            source={require('./assets/profile_image.jpeg')}
            style={{ width: 100, height: 100 }} />
    <Text>{name}</Text>
    <Text>Phone No: {phone}</Text>
    <Text>Blood Pressure: {bloodPressure}</Text>
    <Text>Respiratory Rate: {respiratoryRate}</Text>
    <Text>Blood Oxygen Level: {bloodOxygenLevel}</Text>
  </View>
);

const App = () => {
  const patient = {
    name: 'Harshita Tumma',
    phone: '(X) 999-9999',
    bloodPressure: '120/80',
    respiratoryRate: '16 breaths per minute',
    bloodOxygenLevel: '98%'
  };

  return (
    <View>
      <PatientDetails {...patient} />
      <Button title="Add Info" onPress={() => {}} />
    </View>
  );
};

export default AddPatientDetails;
