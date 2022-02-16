import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientLogin from '../PatientLogin';
import Home from '../Home';
import SignUp from '../SignUp';
import firebase from 'firebase/app';
import "firebase/auth";


const Stack = createNativeStackNavigator();

function FireBaseCon(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyCzQ4b12mUvplIwuASeiT5HKLyk8ekD2vc",
    authDomain: "diabeasy-fc6db.firebaseapp.com",
    projectId: "diabeasy-fc6db",
    storageBucket: "diabeasy-fc6db.appspot.com",
    messagingSenderId: "207609066598",
    appId: "1:207609066598:web:110a90c08035b08245a9a7"
  };

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });



  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={PatientLogin} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default FireBaseCon;