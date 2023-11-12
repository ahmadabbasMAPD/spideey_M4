import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientID, patientName, age, phoneNumber } = route.params;

  // State variables for critical data
  const [respiratoryRate, setRespiratoryRate] = useState(12);
  const [bloodPressure, setBloodPressure] = useState(70);
  const [oxygenSaturation, setOxygenSaturation] = useState(95);
  const [heartRate, setHeartRate] = useState(40);
  const [bodyTemperature, setBodyTemperature] = useState(97);

  // State variable for doctor's note
  const [showTextBars, setShowTextBars] = useState({
    doctorsNote: false,
  });

  const [inputText, setInputText] = useState('');

  // Function to handle increment of critical data
  const handleIncrement = (field) => {
    // Incrementing with a maximum value for critical data
    switch (field) {
      case 'respiratoryRate':
        setRespiratoryRate(Math.min(respiratoryRate + 1, 20));
        break;
      case 'bloodPressure':
        setBloodPressure(Math.min(bloodPressure + 1, 120));
        break;
      case 'oxygenSaturation':
        setOxygenSaturation(Math.min(oxygenSaturation + 1, 100));
        break;
      case 'heartRate':
        setHeartRate(Math.min(heartRate + 1, 100));
        break;
      case 'bodyTemperature':
        setBodyTemperature(Math.min(bodyTemperature + 1, 99));
        break;
      default:
        break;
    }
  };

  // Function to handle decrement of critical data
  const handleDecrement = (field) => {
    // Decrementing with a minimum value for critical data
    switch (field) {
      case 'respiratoryRate':
        setRespiratoryRate(Math.min(respiratoryRate - 1, 12));
        break;
      case 'bloodPressure':
        setBloodPressure(Math.min(bloodPressure - 1, 70));
        break;
      case 'oxygenSaturation':
        setOxygenSaturation(Math.min(oxygenSaturation - 1, 95));
        break;
      case 'heartRate':
        setHeartRate(Math.min(heartRate - 1, 40));
        break;
      case 'bodyTemperature':
        setBodyTemperature(Math.min(bodyTemperature - 1, 97));
        break;
      default:
        break;
    }
  };

  // Function to toggle the visibility of doctor's note input
  const handleAddNote = (field) => {
    setShowTextBars((prevBars) => ({
      ...prevBars,
      [field]: !prevBars[field],
    }));
  };

  // Function to save test data to the server
  const handleSave = () => {
    saveTestData();
  };

  const saveTestData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/Patients/${patientID}/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodPressure,
          heartRate,
          respiratoryRate,
          oxygenSaturation,
          bodyTemperature,
        }),
      });

      const data = await response.json();
      console.log('Test data saved:', data);

      // Navigating to the next screen with the updated data
      navigation.navigate('UpdatedCriticalInfoScreen', {
        respiratoryRate,
        bloodPressure,
        oxygenSaturation,
        heartRate,
        bodyTemperature,
        inputText,
      });
    } catch (error) {
      console.error('Error saving test data:', error);
    }
  };

  // Helper function to render the controls for critical data
  function renderControl(label, field, color) {
    return (
      <View style={[styles.row, { borderColor: color }]} key={field}>
        <Text style={[styles.label, { color: color }]}>{label}:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={() => handleDecrement(field)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{getFieldValue(field)}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={() => handleIncrement(field)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Helper function to render the control for doctor's note
  function renderNoteControl(label, field, color) {
    return (
      <View style={[styles.row, { borderColor: color }]} key={field}>
        <Text style={[styles.label, { color: color }]}>{label}:</Text>
        <TouchableOpacity style={[styles.noteButton, { backgroundColor: color }]} onPress={() => handleAddNote(field)}>
          <Text style={styles.noteButtonText}>
            {showTextBars[field] ? 'Close' : 'Add Note'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Helper function to get the current value of a critical data field
  function getFieldValue(field) {
    switch (field) {
      case 'respiratoryRate':
        return respiratoryRate;
      case 'bloodPressure':
        return bloodPressure;
      case 'oxygenSaturation':
        return oxygenSaturation;
      case 'heartRate':
        return heartRate;
      case 'bodyTemperature':
        return bodyTemperature;
      default:
        return '';
    }
  }

  // Styles for the component
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333333',
      marginTop: 20,
    },
    sectionHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: '#333333',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
    },
    label: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    value: {
      fontSize: 16,
      marginHorizontal: 10,
      color: '#333333',
    },
    noteButton: {
      padding: 10,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    noteButtonText: {
      color: 'white',
      fontSize: 16,
    },
    textBar: {
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D3D3D3',
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
      color: '#333333',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 50,
      marginTop: 20,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Update Patient Details</Text>

      <Text style={styles.sectionHeading}>Patient Information</Text>

      {/* Render controls for critical data */}
      {renderControl('Respiratory Rate', 'respiratoryRate', '#FF6347')}
      {renderControl('Blood Pressure', 'bloodPressure', '#FFA500')}
      {renderControl('Oxygen Saturation', 'oxygenSaturation', '#90EE90')}
      {renderControl('Heart Rate', 'heartRate', '#87CEEB')}
      {renderControl('Body Temperature', 'bodyTemperature', '#6495ED')}
      {/* Render control for doctor's note */}
      {renderNoteControl("Doctor's Note", 'doctorsNote', '#FF69B4')}

      {/* Show text input for doctor's note if it's toggled */}
      {showTextBars.doctorsNote && (
        <View style={styles.textBar}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter Doctor's Note"
            placeholderTextColor="#A9A9A9"
            multiline
          />
        </View>
      )}

      {/* Button to save the data */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddInfoScreen;
