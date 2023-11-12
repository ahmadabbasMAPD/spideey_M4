// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CareProviderHomePage from './CareProviderHomePage';
import CareProviderLoginPage from './CareProviderLoginPage';
import UserLoginPage from './UserLoginPage';
import PatientDetails from './PatientDetails';
import AddInfoScreen from './AddInfoScreen';
import UpdatedCriticalInfoScreen from './UpdatedCriticalInfoScreen'; // Import UpdatedCriticalInfoScreen
import CareProviderDetailsPage from './CareProviderDetailsPage';
import ProfileEdit from './ProfileEdit';
import SearchCareProviderPage from'./SearchCareProviderPage';
import UserHomePage from './UserHomePage';
import DoctorDetails from './DoctorDetails';
import PatientSearch from './PatientSearch';
import AddPatientDetails from './AddPatientDetails';
import ContactDoctorsPage from './ContactDoctorsPage';
import AddPatients from './AddPatients';
import UpdateTest from './UpdateTest'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000', // Set the navigation bar background color to black
          },
          headerStatusBarHeight: 50, // Move the navigation bar a little below the top
          headerTintColor: '#FFFFFF', // Make the navigation bar text white color
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CareProviderHomePage" component={CareProviderHomePage} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
        <Stack.Screen name="AddInfoScreen" component={AddInfoScreen} />
        <Stack.Screen name="UpdatedCriticalInfoScreen" component={UpdatedCriticalInfoScreen} />
        <Stack.Screen name="CareProviderDetailsPage" component={CareProviderDetailsPage}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEdit}/>
        <Stack.Screen name="SearchCareProviderPage" component={SearchCareProviderPage}/>  
        <Stack.Screen name="UserHomePage" component={UserHomePage}/>  
        <Stack.Screen name="DoctorDetails" component={DoctorDetails}/>  
        <Stack.Screen name="PatientSearch" component={PatientSearch}/>  
        <Stack.Screen name="AddPatientDetails" component={AddPatientDetails}/> 
        <Stack.Screen name="CareProviderLoginPage" component={CareProviderLoginPage}/>
        <Stack.Screen name="UserLoginPage" component={UserLoginPage}/>
        <Stack.Screen name="ContactDoctorsPage" component={ContactDoctorsPage} />
        <Stack.Screen name="AddPatients" component={AddPatients} />
        <Stack.Screen name="UpdateTest" component={UpdateTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}