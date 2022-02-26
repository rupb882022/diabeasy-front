
import React from 'react'
import { Platform,Animated } from 'react-native';
import Login from '../Pages/Login'
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Pages/SignUp';
import Drawer from './Drawer';
import PersonalInfo1 from '../Pages/PersonalInfo1'
import PersonalInfo2 from '../Pages/PersonalInfo2'

import Setting from '../Pages/Setting';
import { CardStyleInterpolators } from '@react-navigation/stack';
import Gallery from '../Pages/ImagePicker/Gallery';
import CameraUse from '../Pages/ImagePicker/CameraUse';

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
    // cardStyleInterpolator:Platform.OS==='ios'? CardStyleInterpolators.forModalPresentationIOS:CardStyleInterpolators.CardStyleInterpolators.forFadeFromBottomAndroid,
    // transitionSpec: {
    //   open: config,
    //   close: config,
    // },

    

  }

  // const config = {
  //   animation: 'spring',
  //   config: {
  //     stiffness: 1000,
  //     damping: 100,
  //     mass: 5,
  //     overshootClamping: true,
  //       restDisplacementThreshold: 1,
  //       restSpeedThreshold: 1,
  //   },
  // };


  // const forFade = ({ current, next }) => {
  //   const opacity = Animated.add(
  //     current.progress,
  //     next ? next.progress : 0
  //   ).interpolate({
  //     inputRange: [0, 1, 2],
  //     outputRange: [0, 1, 0],
  //   });
  
  //   return {
  //     leftButtonStyle: { opacity },
  //     rightButtonStyle: { opacity },
  //     titleStyle: { opacity },
  //     backgroundStyle: { opacity },
  //   };
  // };
  

  return (

    <Stack.Navigator initialRouteName='Login'  screenOptions={{
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