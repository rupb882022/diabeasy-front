import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {Delete_Comment} from '../../Functions/Function'
import { AntDesign } from '@expo/vector-icons';


export default function DeleteComment(props) {
  const { setShowEdit, id, getallcomment, respones } = props


  const deleteComment = () => {
    setShowEdit();
    Delete_Comment(id).then((resulte) => {
      getallcomment();
    },
      (error) => {
        console.log("error in function Delete_Comment", error)
      })
  }

  return (<>
    <TouchableOpacity style={styles.DeleteComment} onPress={deleteComment}>
      <Text>
        <AntDesign name="delete" size={20} color="black" />
        delete
      </Text>
      {respones && <Text style={{ textAlign: 'center', fontSize: 10, width: '100%', paddingTop: '1%', marginLeft:'13%' }}>it will delete all respones</Text>}
    </TouchableOpacity>
</>
  )
}
const styles = StyleSheet.create({

  DeleteComment: {
    backgroundColor: '#FFC052',
    width: '130%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:'15%',
    marginTop:'2%',
    padding:'2%'
  }
})