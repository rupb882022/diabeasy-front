import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageUri } from '../../Routes/Url'
import { ZoomIn } from 'react-native-reanimated';

export default function GoodFood(props) {

  const window = Dimensions.get('window');
  const { position, hide = false,Food_image,countGood,foodCount ,ratio,food_id,food_name} = props
  

  let image=Food_image ? Food_image.includes("http") ? Food_image : ImageUri + Food_image : ImageUri + 'emptyFoodPhoto.JPG' ;
  
console.log("food_name",food_name)
  return (
    <View id={food_id} style={styles.container(Math.floor(window.height - window.height / 10 * 7.5), hide)}>
      {!hide&& <>
        <Text style={styles.count}>{position}</Text>
        <Text style={styles.title}>{food_name}</Text>
        <Image style={styles.image} source={{ uri:image }} />
        <Text style={styles.content}>Total eaten: {foodCount}</Text>
        <Text style={styles.content}>was good for you: {countGood}</Text>
        <Text style={styles.content}>Match {ratio}%</Text>
      </>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: (height, hide) => {
    if (hide) {
      return {
        backgroundColor: 'transparent',
        flexDirection: 'colum',
        flexBasis: '50%',
      }
    }
    return {
      flex: 1,
      flexDirection: 'colum',
      flexBasis: '45%',
      marginHorizontal: '2%',
      marginBottom: '4%',
      height: height,
      // justifyContent:'center',
      backgroundColor: 'white',
      shadowOffset: {
        width: -2,
        height: 1
      },
      shadowColor: '#727272',
      shadowOpacity: 1,
      padding: '1%',
      justifyContent: 'space-evenly',

    }
  }, image: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    resizeMode: 'contain',
    maxWidth:90,alignSelf:'center'
    
  },
  count: {
    position: 'absolute',
    fontSize: 40,
    top: '23%',
    left: '5%',
    color: '#e6e6e69c',
    zIndex:20
  },
  title: {
    textAlign: 'center',
    paddingBottom: '2%',
    fontSize: 15,
    fontWeight: '600',
    //  bottom:'2%'
  },
  content: {
    textAlign: 'auto',
    color: '#818080',
    top: '1%',
    paddingLeft: '5%'
  }
})