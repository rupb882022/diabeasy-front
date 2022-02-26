import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react';


export default function Setting({ navigation }) {


  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}> 
      <Text>log out</Text>
      </TouchableOpacity>
    </View>
  )
}