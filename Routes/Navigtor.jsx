import { View, Text } from 'react-native'
import React from 'react'
import PatientLogin from '../Pages/PatientLogin'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import InsertData from '../Pages/InsertData'
import CustomDrawer from './CustomDrawer'
import { Ionicons, Entypo, AntDesign,MaterialCommunityIcons  } from '@expo/vector-icons';

const Stack=createNativeStackNavigator();
const Drawernav = createDrawerNavigator();

export default function Navigtor() {
      //color of icons
      let color = "black"

      //style of the drawer
      const Theme = {
          colors: {
              ...DefaultTheme.colors,
              background: 'transparent',
              primary: '#ff650d',
          },
      };
  
      const options = {
          headerStyle: {
              backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
              color: 'transparent',
          },
      }

  return (
    <NavigationContainer>

      </NavigationContainer>
      )
}