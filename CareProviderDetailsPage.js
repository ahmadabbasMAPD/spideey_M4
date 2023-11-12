import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProfilePic from './assets/profile_image.jpeg';

const CareProviderDetails = ({ route, navigation }) => {
  const { coach } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Care Provider Details</Text>
      <Image source={ProfilePic} style={styles.image} />
      <Text style={styles.name}>{coach.name}</Text>
      <Text style={styles.category}>{coach.category}</Text>
      <Text style={styles.rating}>Rating: {coach.rating}</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Specialties Pressed')}>
        <Text style={styles.buttonText}>View Specialties</Text>
      </TouchableOpacity>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161616',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffcc',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
    color: '#00cc99',
  },
  rating: {
    fontSize: 16,
    marginBottom: 20,
    color: '#cccccc',
  },
  button: {
    backgroundColor: '#00cc99',
    padding: 15,
    width: 250,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CareProviderDetails;
