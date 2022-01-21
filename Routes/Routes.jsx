import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const stack=createNativeStackNavigator();

export default function Routes() {
  return (
<stack.Navigator>
    {/* <stack.Screen  name="Button" component={Button}/>
    <stack.Screen  name="Input" component={Input}/> */}
</stack.Navigator>
  );
}
