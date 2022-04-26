import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';

export default function Recommandation() {
const [unit,setUnit]=useState(3)

  return (
    <View style={styles.container}>
    <Header 
    title='Recommandation'
    flex={0.15}
    marginLeft={13}
    //possiton={50}
    />
     <View style={{flex:0.8}}>

<Text>The injection recommandation for you is {unit} units </Text>





     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
}, 

})