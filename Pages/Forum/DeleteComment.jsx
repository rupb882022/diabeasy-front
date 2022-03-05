import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import apiUrl from '../../Routes/Url';
import { AntDesign } from '@expo/vector-icons';


export default function DeleteComment(props) {
  const { setShowEdit, id, getallcomment, respones } = props


  const deleteComment = () => {
    setShowEdit();
    console.log("id", apiUrl + `forum/Delete/${id}`);
    fetch(apiUrl + `forum/Delete/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'appliction/json; charset=UTF-8',
        'Accept': 'appliction/json; charset=UTF-8'
      })
    }).then(res => {
      if (res && res.status == 200) {
        return res.json();
      } else {
        console.log("status code:", res.status)
      }
    }).then((resulte) => {
      console.log(resulte);
      getallcomment();
    },
      (error) => {
        console.log("error", error)
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