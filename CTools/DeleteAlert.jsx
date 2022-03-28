import { StyleSheet, Text, View ,Alert} from 'react-native'
import React from 'react'

export default function DeleteAlert(props) {
let { answer }= props

  return (
    <>
  { Alert.alert(
    
    "Delete Item",
    "Are you sure you want to permanently delete this item?",
    [
      {
        text: "Cancel",
        onPress: () =>{ console.log("Cancel Pressed");answer(false)},
        style: "cancel"
      },
      { text: "OK",
       onPress: () =>{ console.log("OK Pressed");answer(true)},
       style: "default"
      }
    ]
  )
  }</>
  )
}

const styles = StyleSheet.create({


})