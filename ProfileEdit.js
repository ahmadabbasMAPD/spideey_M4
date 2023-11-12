import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import ProfilePic from './assets/profile_image.jpeg'; // Make sure to import the profile image correctly

const ProfileEdit = ({ route, navigation }) => {
  // Extracting the coach object from the route params
  const { coach } = route.params;

  return (
    // Wrapping the content in a ScrollView for scrollable content
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Edit Profile</Text>

        {/* Profile Picture */}
        <Image style={styles.image} source={ProfilePic} />

        {/* Coach Details */}
        <Text style={styles.name}>{coach.name}</Text>
        <Text style={styles.category}>{coach.category}</Text>
        <Text style={styles.rating}>Rating: {coach.rating}</Text>

        {/* Input fields */}
        <Text style={styles.label}>USERNAME</Text>
        <TextInput style={styles.input} value={coach.name} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="yanchui@gmail.com" />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="+1498789999" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="evFfTbyVVCd" secureTextEntry={true} />

        {/* Update button */}
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: '#161616',
    paddingVertical: 20,
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#00cc99',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#ffffff',
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

export default ProfileEdit;
