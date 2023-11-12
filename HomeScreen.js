import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Logo.jpeg')} style={styles.image} />
      <Text style={[styles.text, styles.title]}>HealthSync</Text>
      <Text style={[styles.text, styles.subtitle]}>Seamless Care, Empowering Lives</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CareProviderLoginPage')}>
        <Text style={styles.buttonText}>Login as a Careprovider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserLoginPage')}>
        <Text style={styles.buttonText}>Login as a User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    marginBottom: 20,
    borderColor: '#00FF00',
    borderWidth: 2,
  },
  text: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#00FF00',
    borderRadius: 10,
    marginTop: 20,
    width: 200,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
