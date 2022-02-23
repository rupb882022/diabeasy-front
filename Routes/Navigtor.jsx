import { View, Text } from 'react-native'
import React from 'react'
import Login from '../Pages/Login'
import {DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import SignUp from '../Pages/SignUp';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import InsertData from '../Pages/InsertData'
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign,MaterialCommunityIcons  } from '@expo/vector-icons';
import Drawer from './Drawer';

const Stack=createNativeStackNavigator();
const Drawernav = createDrawerNavigator();

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
        //   stiffness: 1000,
        //   damping: 500,
        //   mass: 3,
          overshootClamping: false,
        //   restDisplacementThreshold: 0.01,
        //   restSpeedThreshold: 0.01,
        },
      };

  return (

      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false,
        detachInactiveScreens:false
      }}>
        <Stack.Screen name="Login" options={{...options, headerLeft: null,    transitionSpec: {
      open: config,
      close: config,
    },}} component={Login}/>
        <Stack.Screen name="SignUp" options={{...options, headerLeft: null,    transitionSpec: {
      open: config,
      close: config,
    },}} component={SignUp}/>
        <Stack.Screen name="Drawer" options={{...options, headerLeft: null,    transitionSpec: {
      open: config,
      close: config,
    },}} component={Drawer}/>
      </Stack.Navigator>


      )
}