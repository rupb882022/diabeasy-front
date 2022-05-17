import { View, Text ,StyleSheet,Image,Dimensions} from 'react-native'
import React from 'react'
import {ImageUri} from '../../Routes/Url'
import moment from 'moment';

export default function HipoFood(props) {

  const window =Dimensions.get('window');
  console.log(Math.floor(window.height-window.height/10*7));
  const {hide=false,next_blood_sugar_level,totalCarbs,food_name,Unit_name,image,date_time,blood_sugar_level,amount}=props
  return (
    <View style={styles.container(Math.floor(window.height-window.height/10*7.5),hide)}>
  {hide?<></>: <> 
   <Text style={styles.title}>{amount} {Unit_name} {food_name}</Text>
      <Image style={styles.image}  source={{ uri: image ? image.includes("http")?image:ImageUri +image : ImageUri + 'emptyFoodPhoto.JPG' }} />
      <Text style={styles.content}>date: {moment(date_time).format('DD/MM/YYYY')}</Text>
      <Text style={styles.content}>sugar level: {blood_sugar_level}</Text>
      <Text style={styles.content}>next sugar level: {next_blood_sugar_level}</Text>
      <Text style={styles.content}>carbohydrates: {totalCarbs}</Text>
      </>  }
    </View>
  )
}
const styles = StyleSheet.create({
  container:(height,hide)=>{
    if(hide){
      return{
        backgroundColor:'transparent',
        flexDirection:'colum',
        flexBasis: '50%',
      }
    }
    return{flex:1,
     flexDirection:'colum',
     flexBasis: '45%',
     marginHorizontal:'2%',
     marginBottom:'4%',
    height:height,
    // justifyContent:'center',
    backgroundColor:'white',
    shadowOffset: {
      width: -2,
      height: 1
    },
    shadowColor:'#727272',
    shadowOpacity:1,
    padding:'1%',
    justifyContent:'space-evenly',
    
  }
},image:{
    width: '100%',
    height: '45%',
    justifyContent:'center',
    resizeMode: 'contain',
  },
  title:{
    textAlign:'center',
 paddingBottom:'2%',
 fontSize:15,
 fontWeight:'600',
//  bottom:'2%'
  },
  content:{
    textAlign:'auto',
    color:'#818080',
    top:'1%',
    paddingLeft:'5%'
  }
})