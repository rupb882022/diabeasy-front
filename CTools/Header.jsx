import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { heart_icon } from '../images/headerLogo/heart.png';


export default function Header(props) {
  const { logo_image, title, flex, paddingRight } = props
  var icon = '';

  switch (logo_image) {
    case 'heart':
      icon = require('../images/headerLogo/heart.png')
      break;
    default:
      break;
  }



  return (
    <>
      <View style={styles.container(flex)}>
        <Text style={styles.title(paddingRight)}>{title}</Text>
        <Image
          style={styles.Image}
          source={icon}
        />
      </View>
      <View style={styles.line}></View>
    </>
  );
}
const styles = StyleSheet.create({
  container: (flex = 1) => {
    return {
      flex: flex,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    }
  },
  Image: {
    resizeMode: 'contain',
    height: '84%',
    width: '25%',
  },
  title: (paddingRight = 0) => {
    return {
      fontSize: 30,
      width: '70%',
      height: '55%',
      textAlign: 'right',
      paddingRight: paddingRight + '%',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: '#1EA6D6',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1
    }
  },
  line: {
    borderBottomWidth: 3
  }
});