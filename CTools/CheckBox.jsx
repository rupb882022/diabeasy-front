import { View, Text } from 'react-native'
import React,{useState} from 'react'
import Button from './Button'
import { Fontisto } from '@expo/vector-icons';

//TODO for login and food ingrediants
export default function CheckBox(props) {
  const {ischeck=false,getvalue}=props;

  const [check, setCheck] = useState(ischeck);

  return (
    <Button
    element={check ? <Fontisto name="checkbox-active" size={15} color="black" /> :
        <Fontisto name="checkbox-passive" size={15} color="black" />}
    width={0}
    height={0}
    color='transparent'
    alignItems='center'
    borderColor='transparent'
    onPress={() => setCheck(!check) }
/>
  )
}