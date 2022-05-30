import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ImageUri } from '../../Routes/Url'
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

export default function HipoFood(props) {

  const window = Dimensions.get('window');
  const { times_eaten,position, hide = false, next_blood_sugar_level, totalCarbs, date_time, blood_sugar_level, Food } = props
  
  const [food, setFood] = useState(Food && Food[0]);

  let image=food?food.image ? food.image.includes("http") ? food.image : ImageUri + food.image : ImageUri + 'emptyFoodPhoto.JPG':'' ;
  

  const next_item = (side) => {

    let index=0;
     Food.forEach((x, i) => {
      if (food.foodId == x.foodId) {
        index=i;
      }
    })
    console.log("index",index)
    if (side == "left" && index == 0) {
      setFood(Food[Food.length - 1])
    }else if(side == "left" && index != 0){
      setFood(Food[index - 1])
    }else if(side == "right" && index == 0){
      setFood(Food[index + 1])
    }else{
      setFood(Food[0])
    }
  }
  return (
    <View style={styles.container(Math.floor(window.height - window.height / 10 * 7.5), hide)}>
      {hide ? <></> : <>
        <Text style={styles.count}>{position}</Text>
        <Text style={styles.title}>{food.amount} {food.unitName} {food.FoodName}</Text>
        <Image style={styles.image} source={{ uri:image }} />
        <Text style={styles.content}>date: {moment(date_time).format('DD/MM/YYYY')}</Text>
        <Text style={styles.content}>sugar level: {blood_sugar_level}</Text>
        <Text style={styles.content}>next sugar level: {next_blood_sugar_level}</Text>
        <Text style={styles.content}>carbohydrates: {totalCarbs}</Text>
        <Text style={styles.content}>times eaten: {times_eaten}</Text>
      </>}
      {Food && Food.length > 1 &&
        <View style={{ position: 'absolute', flexDirection: 'row', top: '44%', left: '5%', }}>
          <TouchableOpacity onPress={() => { next_item("left"); }}>
            <AntDesign name="arrowleft" size={30} color="#767676" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { next_item("right"); }} style={{ left: '290%' }}>
            <AntDesign name="arrowright" size={30} color="#767676" />
          </TouchableOpacity>
        </View>
      }
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
  },
  count: {
    position: 'absolute',
    fontSize: 40,
    top: '23%',
    left: '5%',
    color: '#e6e6e69c'
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