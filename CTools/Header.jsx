import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Information from './Information';



export default function Header(props) {
  const { logo_image, possiton = 75, title, flex, paddingRight, marginLeft, flexDirection, line = true, image_heigt, image_width, alignItems, justifyContent, image_margin, fontSize } = props
  var icon = '';

  //for icon image margin 
  let image_marginBottom = image_margin && image_margin.Bottom ? image_margin.Bottom : 0;
  let image_marginTop = image_margin && image_margin.Top ? image_margin.Top : 0;


  switch (logo_image) {
    case 'heart':
      icon = require('../images/headerLogo/heart.png')
      break;
    case 'diabeasy':
      icon = require('../images/headerLogo/diabeasy_logo.png')
      break;
    case 'forum':
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
      <View style={styles.container(flex, flexDirection, alignItems, justifyContent, possiton)}>
        {/* <Text style={styles.title(paddingRight, marginLeft, fontSize)}>{title}</Text> */}
                <Text style={styles.title(paddingRight, marginLeft, fontSize)}>Diabeasy</Text>

        {logo_image&&logo_image === 'diabeasy' && <Image
          style={styles.Image(image_heigt, image_width, image_marginTop, image_marginBottom)}
          source={icon}
        /> 
        }

      </View>
      {line ? <View style={styles.line(possiton)}></View> : <></>}
    </>
  );

}
const styles = StyleSheet.create({
  container: (flex = 1, flexDirection = 'row', alignItems = 'flex-end', justifyContent = 'flex-start', possiton) => {
    return {
      flex: flex,
      flexDirection: flexDirection,
      justifyContent: justifyContent,
      alignItems: alignItems,
      position: 'relative',
      bottom: possiton,
      backgroundColor:'#D8E2DC',
      ZIndex:0
    }
  },
  Image: (image_heigt = 84, image_width = 25, image_marginTop, image_marginBottom) => {
    return {
      resizeMode: 'contain',
      height: image_heigt + '%',
      width: image_width + '%',
      marginTop: image_marginTop + '%',
      marginBottom: image_marginBottom + '%',
    }
  },
  title: (paddingRight = 0, marginLeft = 0, fontSize = 30) => {
    return {
      fontSize: fontSize,
      // width: '10%',
      // height: '55%',
       left:'35%',bottom:'27%',
      textAlign: 'right',
      paddingRight: paddingRight + '%',
      marginLeft: marginLeft + '%',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: '#1EA6D6',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      position: 'absolute',
    }

  },
  line: (possiton) => {
    return {
      borderBottomWidth: 3,
      position: 'relative',
      bottom: possiton,
      borderColor:'#1EA6D6'
    }
  },
  iconsRow: {
    flexDirection: 'row',
    marginBottom: '3%'
  },icon:{
    paddingLeft:'8%'
  }
});