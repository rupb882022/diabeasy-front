import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import apiUrl from '../../Routes/Url';
import { AntDesign } from '@expo/vector-icons';


export default function DeleteComment(props) {
  const { setShowEdit, id,getallcomment,respones } = props


  const deleteComment = () => {
    setShowEdit();
    console.log("id", id);
    fetch(apiUrl + `forum?id=${id}`, {
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
    <TouchableOpacity onPress={deleteComment}>
      <Text>
        <AntDesign name="delete" size={20} color="black" />
        delete
      </Text>
      </TouchableOpacity>
        {respones&&<Text style={{textAlign:'center',fontSize:10}}>it will delete all respones</Text>}</>
  )
}
