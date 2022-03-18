import { View, Text ,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';


//TODO change alert
export default function UpdateComment(props) {
  const {setShowEdit,respones}=props

  return (
          <TouchableOpacity style={styles.UpdateComment} onPress={()=>{setShowEdit(); respones&&alert("can not edit comment with respones");}}>
            <Text style={{marginRight:'10%'}}>
            <Feather name="edit-3" size={20} color="black" />
            Edit
          </Text></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
UpdateComment:{
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