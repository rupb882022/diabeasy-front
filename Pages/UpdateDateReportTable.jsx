import { StyleSheet, Text, View ,TouchableOpacity,} from 'react-native'
import React ,{useState} from 'react'
import DeleteAlert from '../CTools/DeleteAlert'
import {Feather} from '@expo/vector-icons'


export default function UpdateDateReportTable(props) {
  const {setShowEdit}=props

  return (
    <TouchableOpacity style={styles.Update} onPress={()=>{setShowEdit()}}>
    <Text style={{marginRight:'10%'}}>
    <Feather name="edit-3" size={20} color="black" />
    Edit
  </Text></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Update:{
    backgroundColor:'#FFCF84',
    width:'130%',
    flex: 1,
    justifyContent:'center',
    paddingTop:'2%',
    paddingBottom:'2%',
    paddingRight:'3%',
    alignItems:'center'
  },

})