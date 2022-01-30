import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';



export default function Header(props) {
  const { logo_image, title, flex, paddingRight, flexDirection, line = true, image_heigt, image_width, alignItems, justifyContent } = props
  var icon = '';

  switch (logo_image) {
    case 'heart':
      icon = require('../images/headerLogo/heart.png')
      break;
    case 'diabeasy':
      icon = require('../images/headerLogo/diabeasy_logo.png')
      break;
    case 'form':
      icon = require('../images/headerLogo/edit_details.png')
      break;
    case 'graph':
      icon = require('../images/headerLogo/graph.png')
      break;
    case 'injection':
      icon = require('../images/headerLogo/injection.png')
      break;
    case 'infusion':
      icon = require('../images/headerLogo/insert_data.png')
      break;
    case 'panic':
      icon = require('../images/headerLogo/panic_button.png')
      break;
    case 'perscriptions':
      icon = require('../images/headerLogo/perscriptions.png')
      break;
    case 'recipes':
      icon = require('../images/headerLogo/recipes.png')
      break;
    case 'virus':
      icon = require('../images/headerLogo/setting.png')
      break;
    default:
      break;
  }
  return (
    <>
      <View style={styles.container(flex, flexDirection, alignItems, justifyContent)}>
        <Text style={styles.title(paddingRight)}>{title}</Text>
        <Image
          style={styles.Image(image_heigt, image_width)}
          source={icon}
        />
      </View>
      {line ? <View style={styles.line}></View> : <></>}
    </>
  );
}
const styles = StyleSheet.create({
  container: (flex = 1, flexDirection = 'row', alignItems = 'flex-end', justifyContent = 'flex-start') => {
    return {
      flex: flex,
      flexDirection: flexDirection,
      justifyContent: justifyContent,
      alignItems: alignItems,
    }
  },
  Image: (image_heigt = 84, image_width = 25) => {
    return {
      resizeMode: 'contain',
      height: image_heigt + '%',
      width: image_width + '%'
    }
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