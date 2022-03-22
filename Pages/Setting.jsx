import { View, Text, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../CTools/UserDetailsHook'


export default function Setting({ navigation }) {
  const {userDetails,setUserDetails} = useContext(UserContext);
//TODO alert in catch 
//   const storeData = async () => {
//     try {
//         await AsyncStorage.clear();
//         const jsonValue = await AsyncStorage.getItem('userDetails');
//         setUserDetails(null);
//         console.log('jsonValue333',jsonValue);
//           navigation.navigate('Login');
//     } catch (e) {
//         await AsyncStorage.setItem('eror', e)
//     }
// }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* <TouchableOpacity onPress={() =>{storeData()}}> 
      <Text>log out</Text>
      </TouchableOpacity> */}
    </View>
  )
}