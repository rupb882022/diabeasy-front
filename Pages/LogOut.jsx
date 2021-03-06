import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../CTools/UserDetailsHook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../CTools/Loading';
import { useFocusEffect } from '@react-navigation/native';

export default function Routes(props) {

  const { navigation, route } = props
  // const { setUserDetails } = useContext(UserContext);

  const storeData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      console.log("jsonValue",jsonValue);
    
      jsonValue&&await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      await AsyncStorage.setItem('eror', e)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
    storeData();
  }))

  return (
    <View>
      <Loading
     opacity={'#d6f2fc'}
     text={'Logging you out! Hope to see you soon!'}
      />
    </View>
  )
}