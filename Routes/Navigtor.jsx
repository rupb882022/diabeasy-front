
import React from 'react'
import Login from '../Pages/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../Pages/SignUp';
import Drawer from './Drawer';
import PersonalInfo1 from '../Pages/PersonalInfo1'
import PersonalInfo2 from '../Pages/PersonalInfo2'
import Setting from '../Pages/Setting';

const Stack=createNativeStackNavigator();

export default function Navigtor() {
    const options = {
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'transparent',
        },
    }

    const config = {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 1,
          mass: 0,
          overshootClamping: true,
        //   restDisplacementThreshold: 1,
        //   restSpeedThreshold: 1,
        },
      };

  return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false,
        detachInactiveScreens:false
      }}>
        <Stack.Screen name="Login" options={{...options, headerLeft: null,transitionSpec: {open: config,close: config},}} component={Login}/>
        <Stack.Screen name="SignUp" options={{...options, headerLeft: null,transitionSpec: { open: config,close:config},}} component={SignUp}/>
        <Stack.Screen name="Drawer" options={{...options, headerLeft: null,transitionSpec: {open: config,close:config},}} component={Drawer}/>
        <Stack.Screen name="Setting" options={{...options, headerLeft: null,transitionSpec: {open: config,close:config},}} component={Setting}/>
        <Stack.Screen name="PersonalInfo1" options={{...options, headerLeft: null,transitionSpec: {open: config,close:config},}} component={PersonalInfo1}/>
        <Stack.Screen name="PersonalInfo2" options={{...options, headerLeft: null,transitionSpec: {open: config,close:config},}} component={PersonalInfo2}/>
      </Stack.Navigator>
      )
}