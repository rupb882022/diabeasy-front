import React, { useEffect, useRef } from 'react';
import { Octicons, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { Animated, Text, View,StyleSheet } from 'react-native';

export default function Alert(props) {

  const { text, time = 2000, type,bottom=5 } = props
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("*");
      if(text){
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(time),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    }
  });


  const alertByType = () => {
    switch (type) {
      case 'success':
        return (<View style={styles.row}>
        <FontAwesome5 name="smile-beam" size={20} color='#359E25' /><Text style={styles.text('#359E25')}>{text}</Text></View>)
      case 'alert':
        return (<View style={styles.row}>
          <Octicons name="alert" size={20} color='#FCCE37' /><Text style={styles.text('#FCCE37')}>{text}</Text></View>)
      case 'worng':
        return  (<View style={styles.row}>
          <Fontisto name="confused" size={20} color='#E61A1A' /><Text style={styles.text('#E61A1A')}>{text}</Text></View>)
      default:
        return<Text style={styles.text('black')}>{text}</Text>
    }
  }
  const element = alertByType();
  return (
    <View
      style={styles.container(bottom)}>
      <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          margin: 10,
          marginBottom: 5,
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 4,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        {element&&element}
      </Animated.View>
    </View >
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  text: (color) => {
    return {
      color: color,
      fontSize: 16,
      paddingLeft: '2%'
    }
  },
  container:(bottom)=>{
    return {position: 'absolute',
    bottom: bottom,
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex:100
  }
  }
})



