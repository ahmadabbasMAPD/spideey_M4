// Import necessary modules
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Component definition
const UserLoginPage = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Hard-coded login credentials
    const hardcodedUsername = 'User';
    const hardcodedPassword = 'password';

    if (username.trim() === '' && password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password');
    } else if (username.trim() === '') {
      Alert.alert('Error', 'Please enter a username');
    } else if (password.trim() === '') {
      Alert.alert('Error', 'Please enter a password');
    } else if (username !== hardcodedUsername || password !== hardcodedPassword) {
      Alert.alert('Error', 'Invalid username or password');
    } else {
      // Navigate to UserHomePage upon successful login
      navigation.navigate('UserHomePage');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>User Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#FF1493"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#FF1493"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  content: {
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF1493',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF1493',
    borderRadius: 10,
    backgroundColor: '#000',
    color: '#FF1493',
  },
  button: {
    backgroundColor: '#FF1493',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Export the component
export default UserLoginPage;
