import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, Entypo, AntDesign,Fontisto } from '@expo/vector-icons';

export default function Footer(props) {
  const { navigation } = props
  let activeColor = '#FFCF84'
  const [color, setColor] = useState({ home: activeColor, sports: 'black', forum: 'black', call: 'black' });

  const handelClick = (name) => {
    console.log(name);
    switch (name) {
      case 'Home':
        setColor({ home: activeColor, sports: 'black', forum: 'black', call: 'black' })
        break;
      case 'Injection':
        setColor({ home: 'black', sports: activeColor, forum: 'black', call: 'black' })
        // navigation.navigate('Sports location');
        break;
      case 'Forum':
        setColor({ home: 'black', sports: 'black', forum: activeColor, call: 'black' })
        // navigation.navigate('Forum');
        break;
      case 'Emergency Call':
        setColor({ home: 'black', sports: 'black', forum: 'black', call: activeColor })
        // navigation.navigate('Emergency Call');
        break;

    }
    navigation.navigate(name);

  }
  return (
    <View style={styles.continer}>
      <View style={styles.row}>
        <TouchableOpacity onPress={()=>handelClick('Home')}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Ionicons name="ios-home-outline" size={30} color={color.home} />
            <Text style={styles.color(color.home)}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handelClick('Recommandtion')}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Fontisto name="injection-syringe" size={30} color={color.sports} />
            <Text style={styles.color(color.sports)}>recommandtion</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handelClick('Forum')}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Ionicons name="chatbubbles-outline" size={30} color={color.forum} />
            <Text style={styles.color(color.forum)}>Forum</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingTop: '1%' }} onPress={()=>handelClick('Emergency Call')}>
          <View style={styles.col}>
            <AntDesign name="exclamationcircleo" size={30} color={color.call} />
            <Text style={styles.color(color.call)}>Quick Call</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly'
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center'
  }, color: (color) => {
    return {
      color: color
    }
  }
})