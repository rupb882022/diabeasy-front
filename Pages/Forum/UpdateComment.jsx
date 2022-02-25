import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import apiUrl from '../../Routes/Url';

//TODO change alert
export default function UpdateComment(props) {
  const {setShowEdit,respones}=props

  return (

          <TouchableOpacity onPress={()=>{setShowEdit(); respones&&alert("cennot edit comment with respones");}} style={{ marginRight: '10%' }}><Text>
            <Feather name="edit-3" size={20} color="black" />
            Edit
          </Text></TouchableOpacity>
  )
}
