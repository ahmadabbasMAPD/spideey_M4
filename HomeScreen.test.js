import React from 'react'; // Importing the React library
import HomeScreen from './HomeScreen'; // Importing the HomeScreen component from the same directory
import renderer from 'react-test-renderer'; // Importing the renderer from react-test-renderer

jest.mock('expo-font'); // Mocking the expo-font module
jest.mock('expo-asset'); // Mocking the expo-asset module

// Define a test for the HomeScreen component
test('renders PatientCard correctly', () => {
  // Render the HomeScreen component to a JavaScript object and create a snapshot
  const tree = renderer.create(<HomeScreen />).toJSON();
  
  // Check if the snapshot matches the previously saved snapshot
  expect(tree).toMatchSnapshot();
});
