import { View, Text ,StyleSheet,Image,Dimensions} from 'react-native'
import React from 'react'
import {ImageUri} from '../../Routes/Url'


export default function HipoFood(props) {

  const window =Dimensions.get('window');
  console.log(window.height);
  console.log(Math.floor(window.height-window.height/10*8));
  const {totalCarbs,food_name,Unit_name,image,date_time,blood_sugar_level,amount}=props
  return (
    <View style={styles.container(Math.floor(window.height-window.height/10*8))}>
      <Text>HipoFood</Text>
      <Image style={styles.image}  source={{ uri: image ? image.includes("http")?image:ImageUri +image : ImageUri + 'emptyFoodPhoto.JPG' }} />
    </View>
  )
}
const styles = StyleSheet.create({
  container:(height)=>{
     return{flex:1,
     flexDirection:'row',
     flexWrap: 'wrap',
    height:height,
    // width:'100%',
    // justifyContent:'center',
    backgroundColor:'white',
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowColor:'#727272',
    shadowOpacity:1,
    padding:'2%',
  }
},image:{
    width: '100%',
    height: '50%',
    justifyContent:'center',
    resizeMode: 'contain',
  }
})