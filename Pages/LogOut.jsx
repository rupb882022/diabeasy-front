import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../CTools/UserDetailsHook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../CTools/Loading';
export default function Routes(props) {

  const { navigation, route } = props
  const { setUserDetails } = useContext(UserContext);

  const storeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      await AsyncStorage.setItem('eror', e)
    }
  }

  useEffect(() => {
    storeData();
  })

  return (
    <View>
      <Loading
        opacity='white'
      />
    </View>
  )
}