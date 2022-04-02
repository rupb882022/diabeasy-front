import React, { useContext, useEffect } from 'react'
import Login from '../Pages/Login'
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Pages/SignUp';
import Drawer from './Drawer';
import PersonalInfo1 from '../Pages/PersonalInfo1'
import PersonalInfo2 from '../Pages/PersonalInfo2'
import Setting from '../Pages/Setting';
import Gallery from '../Pages/ImagePicker/Gallery';
import CameraUse from '../Pages/ImagePicker/CameraUse';
import CustomDrawer from './CustomDrawer';
import AddNewFood from '../Pages/Food/AddNewFood';
import AddUnit from '../Pages/Food/AddUnit';
import DoctorHome from '../Pages/Doctor/DoctorHome';
const Stack = createStackNavigator();

export default function Navigtor() {

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
    <Stack.Navigator initialRouteName= 'Login'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" screenOptions={options} component={Login} />
      <Stack.Screen name="SignUp" screenOptions={options} component={SignUp} />
      <Stack.Screen name="Drawer" screenOptions={options} component={Drawer} />
      <Stack.Screen name="Setting" screenOptions={options} component={Setting} />
      <Stack.Screen name="PersonalInfo1" screenOptions={options} component={PersonalInfo1} />
      <Stack.Screen name="PersonalInfo2" screenOptions={options} component={PersonalInfo2} />
      <Stack.Screen name="Gallery" screenOptions={options} component={Gallery} />
      <Stack.Screen name="CameraUse" screenOptions={options} component={CameraUse} />
      <Stack.Screen name="CustomDrawer" screenOptions={options} component={CustomDrawer} />
      <Stack.Screen name="AddNewFood" screenOptions={options} component={AddNewFood} />
      <Stack.Screen name="DoctorHome" screenOptions={options} component={DoctorHome} />
      <Stack.Screen name="AddUnit" screenOptions={options} component={AddUnit} />
    </Stack.Navigator>
  )
}