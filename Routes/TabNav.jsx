import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import PanicButton from '../Pages/PanicButton';
import Forum from '../Pages/Forum/Forum';
import PatientLogin from '../Pages/PatientLogin';
import { Ionicons, Entypo, AntDesign,MaterialCommunityIcons  } from '@expo/vector-icons';

const Tab=createBottomTabNavigator();
export default function TabNav() {

  return (

<Tab.Navigator
activeColor="oreng"
inactiveColor="black"
barstyle={{backgroundColor:'red'}}
>
<Tab.Screen
name="Home"
component={Home}
options={{
  // tabBarLabel:<Text>Home</Text>,
  tabBarIcon:({color})=>(
<Ionicons name="ios-home-outline" size={24} color={color} />
  ),
}}
/>
<Tab.Screen
name="PatientLogin"
component={PatientLogin}
options={{
  // tabBarLabel:<Text>Patient Login</Text>,
  tabBarIcon:({color})=>(
<Ionicons name="ios-home-outline" size={24} color={color} />
  ),
}}
/>
<Tab.Screen
name="Forum"
component={Forum}
options={{
  // tabBarLabel:<Text>Forum</Text>,
  tabBarIcon:({color})=>(
<Ionicons name="ios-home-outline" size={24} color={color} />
  ),
}}
/>
<Tab.Screen
name="PanicButton"
component={PanicButton}
options={{
  // tabBarLabel:<Text>PanicButton</Text>,
  tabBarIcon:({color})=>(
<Ionicons name="ios-home-outline" size={24} color={color} />
  ),
}}
/>

</Tab.Navigator>

  )
}