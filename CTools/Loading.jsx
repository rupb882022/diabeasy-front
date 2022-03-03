import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
 import * as Progress from 'react-native-progress'
import PopUp from './PopUp'
import {ImageUri} from '../Routes/Url';


const element = <View style={{ flex: 1, justifyContent:'center' }}>
  <ImageBackground source={{uri:ImageUri+'diabeasy_logo.png'}} style={{ width:'100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',position:'absolute' }} resizeMode='center' >
  <Progress.Circle style={{ alignItems: 'flex-end' }} size={131} indeterminate={true} progress={0.2} borderWidth={4} borderColor='#3CA6CD' />
  </ImageBackground>
</View>;

export default function Loading(props) {
const {opacity='#ffffff70'}=props
  return (<PopUp
    width={100}
    height={100}
    animationType='fade'
    backgroundColor={opacity}
    isButton={false}
    element={element}
  />

  );
}