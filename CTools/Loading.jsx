import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import PopUp from './PopUp'
import { ImageUri } from '../Routes/Url';




export default function Loading(props) {
  const { opacity = '#ffffff70', text } = props

  const element = <View style={styles.container}>
    <ImageBackground source={require('../images/headerLogo/diabeasy_logo.png')} style={styles.image} resizeMode='cover' >
      <Progress.Circle style={styles.progress(text?10:2)} size={131} indeterminate={true} progress={0.2} borderWidth={4} borderColor='#3CA6CD' />
      {text && <Text style={{ position: 'relative', top: '95%', flexWrap: 'wrap', fontSize: 18, textAlign: 'center' }}>{text}</Text>}
    </ImageBackground>
  </View>;


  return (<PopUp
    width={100}
    height={100}
    animationType='fade'
    backgroundColor={opacity}
    isButton={false}
    element={element}
  />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute'
  }, progress: (top) => {
    return {
      alignItems: 'flex-end',
      top: top + '%'
    }
  }
})