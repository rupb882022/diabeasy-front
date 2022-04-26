import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Loading from '../CTools/Loading';
import { UserContext } from '../CTools/UserDetailsHook'

export default function InjectionType({navigation}) {

  
  return (
<View style={styles.container}>
<Header 
title='Injection'
flex={0.15}
paddingRight={4}
possiton={50}
/>
<Text style={styles.txt}>Choose an injection type</Text>
<View style={{flex:0.5,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

<Button
text='Fix'
radius={1000}
width={8}
height={8}
onPress={()=>{alert('By press OK, \n your project will delete in 10 seconds')}}
/>
<Button
text='Food'
radius={1000}
width={6}
height={8}
padding={0}
onPress={()=>navigation.navigate('Insert Data')}
/>
<Button
text='Daily'
radius={1000}
width={6}
height={8}
/>


</View>
<View style={{flex:0.3,flexDirection:'row',justifyContent:'space-evenly'}}>
<Image
style={styles.Image}
source={require('../images/home_img.webp.png')}
/>
<Image
style={styles.Image}
source={require('../images/home_img.webp.png')}
/>
</View>     
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
}, 
Image: {
  flex: 0.5,
  // position:'absolute',
  //resizeMode: 'cover',
  width: '50%',
  height:'100%',
  top: '1%',
  alignSelf: 'flex-end',
  opacity: 0.95,
},
txt:{
textAlign:'center',
flex:0.05,
fontSize:20,
justifyContent:'flex-start',
fontWeight:'bold',
paddingBottom:'2%'
},

})