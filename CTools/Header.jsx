import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';


export default function Header(props) {
  const { image, title } = props

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image
          style={styles.Image}
          source={require('../images/headerLogo/heart.png')}
        />
      </View>
      <View style={styles.line}></View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  Image: {
    resizeMode: 'contain',
    height: '84%',
    width: '25%',
  },
  title: {
    fontSize: 30,
    width: '70%',
    height: '55%',
    textAlign: 'right',
    paddingRight: '3%',
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    borderBottomWidth: 3
  }
});