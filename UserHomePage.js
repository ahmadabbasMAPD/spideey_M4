import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Component for displaying details of a doctor
const Doctor = ({ name, contact, specialization, appointments, image, id, navigateToDoctorDetails }) => (
  <TouchableOpacity key={id} onPress={navigateToDoctorDetails}>
    <View style={styles.doctorDetails}>
      <Image source={image} style={styles.doctorImage} />
      <View style={styles.doctorText}>
        <Text style={styles.doctorName}>{name}</Text>
        <Text style={styles.doctorInfo}>Contact: {contact}</Text>
        <Text style={styles.doctorInfo}>Specialization: {specialization}</Text>
        <Text style={styles.doctorInfo}>Appointments: {appointments.join(', ')}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Home screen component
const HomeScreen = ({ navigation }) => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy data for doctors
  const doctorsDetails = [
    {
      id: 1,
      name: "Dr. Smith",
      contact: "111-222-3333",
      specialization: "Cardiologist",
      appointments: ["Monday 2:00 PM", "Wednesday 4:00 PM"],
      image: require('./assets/profile_image.jpeg'),
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Johnson",
      contact: "222-333-4444",
      specialization: "Dermatologist",
      appointments: ["Tuesday 11:00 AM", "Thursday 3:00 PM"],
      image: require('./assets/profile_image.jpeg'),
      rating: 4.5,
    },
    {
      id: 3,
      name: "Dr. Williams",
      contact: "333-444-5555",
      specialization: "Pediatrician",
      appointments: ["Monday 9:00 AM", "Friday 1:00 PM"],
      image: require('./assets/profile_image.jpeg'),
      rating: 4.9,
    },
    {
      id: 4,
      name: "Dr. Davis",
      contact: "444-555-6666",
      specialization: "Ophthalmologist",
      appointments: ["Wednesday 10:00 AM", "Friday 2:00 PM"],
      image: require('./assets/profile_image.jpeg'),
      rating: 4.7,
    },
    {
      id: 5,
      name: "Dr. Anderson",
      contact: "555-666-7777",
      specialization: "Orthopedic Surgeon",
      appointments: ["Tuesday 3:00 PM", "Thursday 5:00 PM"],
      image: require('./assets/profile_image.jpeg'),
      rating: 4.6,
    },
  ];
  

  // Filter doctors based on the search query
  const filteredDoctorsDetails = doctorsDetails.filter(item => (
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.appointments.join(', ').toLowerCase().includes(searchQuery.toLowerCase())
  ));

  // Function to navigate to the details screen of a doctor
  const navigateToDoctorDetails = (doctor) => {
    navigation.navigate('DoctorDetails', { doctor });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, contact, specialization, or appointment"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      
      {/* Display doctors */}
      <View style={styles.doctorContainer}>
        {filteredDoctorsDetails.map(doctor => (
          <Doctor
            key={doctor.id}
            {...doctor}
            navigateToDoctorDetails={() => navigateToDoctorDetails(doctor)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// Updated SearchScreen component
const SearchScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Directly navigate to SearchCareProviderPage when the component mounts
    navigation.navigate('SearchCareProviderPage');
  }, [navigation]); // Include navigation in the dependency array

  return (
    <View style={styles.container}>
      {/* You can add content for SearchCareProviderPage here */}
      <Text>SearchCareProviderPage</Text>
    </View>
  );
};


// Main component representing the user's home page
const UserHomePage = () => {
  return (
    // Bottom tab navigator for Home and Search screens
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    color: '#2C3E50',
  },
  doctorContainer: {
    width: '100%',
  },
  doctorDetails: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    paddingBottom: 10,
  },
  doctorImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#3498DB',
  },
  doctorText: {
    flex: 1,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 10,
  },
  doctorInfo: {
    fontSize: 14,
    color: '#2980B9',
    textAlign: 'left',
    marginLeft: 40,
  },
});

export default UserHomePage;
