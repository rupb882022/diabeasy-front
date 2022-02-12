import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import CardTemp from '../../CTools/CardTemp'

export default function Recipe (props) {
  const { name, image,index } = props

  return (
    <View style={styles.container}>
      <CardTemp
        name={name}
        image={image}
        index={index}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // flexBasis: '50%',
    height: '50%',
width:'50%'
  }
})