import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const coachesData = [
  {
    id: 1,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Dietician',
    name: 'Dr. Jenny Wilson',
    title: 'Expert Dietician',
    rating: '4.8',
  },
  {
    id: 2,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Dietician',
    name: 'Dr. Kristin Watson',
    title: 'Professional Nutritionist',
    rating: '4.9',
  },
  {
    id: 3,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Behaviour',
    name: 'Dr. Michael Johnson',
    title: 'Behavioral Specialist',
    rating: '4.7',
  },
  {
    id: 4,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Behaviour',
    name: 'Dr. Emily Davis',
    title: 'Behavioral Therapist',
    rating: '4.9',
  },
  {
    id: 5,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Fitness',
    name: 'Dr. John Doe',
    title: 'Certified Fitness Trainer',
    rating: '4.6',
  },
  {
    id: 6,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Fitness',
    name: 'Dr. Sarah Parker',
    title: 'Personal Fitness Coach',
    rating: '4.9',
  },
  {
    id: 7,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Yoga Instructor',
    name: 'Dr. Amanda Brown',
    title: 'Certified Yoga Therapist',
    rating: '4.9',
  },
  {
    id: 8,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Physical Therapist',
    name: 'Dr. Alex Smith',
    title: 'Rehabilitation Specialist',
    rating: '4.5',
  },
  {
    id: 9,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Personal Trainer',
    name: 'Dr. Jessica Lee',
    title: 'Personal Training Expert',
    rating: '4.8',
  },
  {
    id: 10,
    imageSource: require('./assets/profile_image.jpeg'),
    category: 'Health Coach',
    name: 'Dr. Samantha White',
    title: 'Holistic Health Practitioner',
    rating: '4.7',
  },
  // Add more coaches as needed
];

const CoachItem = ({ coach, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('CareProviderDetailsPage', { coach })}>
    <View style={styles.coachItemContainer}>
      <Image source={coach.imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{coach.title}</Text>
        <Text style={styles.nameText}>{coach.name}</Text>
        <Text style={styles.ratingText}>Rating: {coach.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const FitnessCoach = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCoaches, setFilteredCoaches] = useState(coachesData);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = coachesData.filter(
      (coach) =>
        coach.name.toLowerCase().includes(text.toLowerCase()) ||
        coach.title.toLowerCase().includes(text.toLowerCase()) ||
        coach.rating.includes(text)
    );
    setFilteredCoaches(filteredData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fitness Coach</Text>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#a0a0a0"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        returnKeyType="search"
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        onChangeText={(text) => handleSearch(text)}
        value={searchText}
        style={styles.searchBar}
      />
      <ScrollView style={styles.scrollView}>
        {filteredCoaches.map((coach) => (
          <CoachItem key={coach.id} coach={coach} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00ffcc',
    textAlign: 'center',
  },
  scrollView: {
    marginBottom: 20,
  },
  coachItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
    paddingVertical: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00cc99',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
  ratingText: {
    fontSize: 16,
    color: '#cccccc',
  },
  searchBar: {
    backgroundColor: '#404040',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
  },
});

export default FitnessCoach;
