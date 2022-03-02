
import React, { useState } from 'react'
import Login from '../Pages/Login'
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Pages/SignUp';
import Drawer from './Drawer';
import PersonalInfo1 from '../Pages/PersonalInfo1'
import PersonalInfo2 from '../Pages/PersonalInfo2'
import Setting from '../Pages/Setting';
import Gallery from '../Pages/ImagePicker/Gallery';
import CameraUse from '../Pages/ImagePicker/CameraUse';

const Stack = createStackNavigator();

export default function Navigtor() {
  const [userDetails, setUserDetails] = useState();
  const options = {
    // cardStyleInterpolator: forFade,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTitleStyle: {
      color: 'transparent',
    },
  }


  return (

    <Stack.Navigator initialRouteName='Login' screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Login" screenOptions={options} component={Login} />
      <Stack.Screen name="SignUp" screenOptions={options} component={SignUp} />
      <Stack.Screen name="Drawer" screenOptions={options} component={Drawer} />
      <Stack.Screen name="Setting" screenOptions={options} component={Setting} />
      <Stack.Screen name="PersonalInfo1" screenOptions={options} component={PersonalInfo1} />
      <Stack.Screen name="PersonalInfo2" screenOptions={options} component={PersonalInfo2} />
      <Stack.Screen name="Gallery" screenOptions={options} component={Gallery} />
      <Stack.Screen name="CameraUse" screenOptions={options} component={CameraUse} />
    </Stack.Navigator>
  )
}