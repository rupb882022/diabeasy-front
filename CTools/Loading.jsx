import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
<<<<<<< HEAD
// import * as Progress from 'react-native-progress'
=======
 import * as Progress from 'react-native-progress'
>>>>>>> beckUp
import PopUp from './PopUp'
//#Nir loading not working in idan proj

const element = <View style={{ flex: 1, justifyContent:'center' }}>
  <ImageBackground source={require('../images/headerLogo/diabeasy_logo.png')} style={{ width:'100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',position:'absolute' }} resizeMode='center' >
  {/* <Progress.Circle style={{ alignItems: 'flex-end' }} size={131} indeterminate={true} progress={0.2} borderWidth={4} borderColor='#3CA6CD' /> */}
  </ImageBackground>
</View>;

export default function Loading() {

  return (<PopUp
    width={100}
    height={100}
    animationType='fade'
    backgroundColor='#ffffff66'
    isButton={false}
    element={element}
  />

  );
}