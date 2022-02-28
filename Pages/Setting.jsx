import { View, Text, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Setting({ navigation }) {


  const storeData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        await AsyncStorage.setItem('eror', e)
    }
}

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() =>{storeData(); navigation.navigate('Login')}}> 
      <Text>log out</Text>
      </TouchableOpacity>
    </View>
  )
}