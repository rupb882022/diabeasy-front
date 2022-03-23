import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext, createContext } from 'react';
import Button from '../../CTools/Button';
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading';
import { UserContext } from '../../CTools/UserDetailsHook'
import { ImageUri } from '../../Routes/Url';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CreatePatientForDoctor(props) {
let color='';
const {p,whileClick} = props
//console.log("p",p);


return(
<TouchableOpacity onPress={()=>whileClick(p.id,p.firstname)}>
{p&&p.profileimage!='' ? <Image source={{uri:ImageUri+p.profileimage}} style={p.select?styles.imageWhite('#FFCF84',5):styles.imageWhite('white',2)}/> :
<Image source={require('../../images/profile_pictur.jpeg')} style={p.select?styles.imageWhite('#FFCF84',5):styles.imageWhite('white',2)} />}
<Text style={{paddingLeft:10,paddingBottom:15}}>{p.firstname+' '+p.lastname }</Text>
</TouchableOpacity>
)


}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  //    alignItems:'flex-start'
  },
  imageWhite :(color,border)=> {
    return {width: 78,
    height: 80,
    borderRadius: 1000,
    //alignSelf: 'flex-start',
     marginTop: '10%',
    //padding:'5%',
    marginLeft:'5%',
    borderColor: color,
    borderWidth: border}
  },

})