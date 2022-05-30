import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../../CTools/Button';
import Header from '../../CTools/Header';
import { useFocusEffect } from '@react-navigation/native';
import {ImageUri} from '../../Routes/Url'
export default function Recommandation({route,navigation}) {

const [fixunit,setFixUnit]=useState()
const [foodUnit,setFoodUnit]=useState()
const [total,setTotal]=useState();
let detials = route.params && route.params.detials ? route.params.detials : '';


useFocusEffect(
  React.useCallback(() => {
    total_reccomandtion();
  }))

console.log("fixunit",fixunit)
console.log("foodUnit",foodUnit)
console.log("total",total)
const total_reccomandtion=()=>{

  if(detials){
    let temptotal=0
    if(detials.reccomandtion.fix&&detials.reccomandtion.food){
      let food=(parseInt(detials.totalCarbs))/parseFloat(detials.reccomandtion.food)
      let fix=(parseInt(detials.blood_sugar_level)-100)/parseFloat(detials.reccomandtion.fix)

      food=Math.floor(food)
      fix=Math.floor(fix)
      setFoodUnit(food);
      setFixUnit(fix);
      temptotal=fix+food;
    }else if(detials.reccomandtion.food){
      temptotal=(parseInt(detials.totalCarbs))/parseFloat(detials.reccomandtion.food)
      setFoodUnit(0);
      setFixUnit(0);
    }else if(detials.reccomandtion.fix){
      temptotal=(parseInt(detials.blood_sugar_level)-100)/parseFloat(detials.reccomandtion.fix)
      setFoodUnit(0);
      setFixUnit(0);
    }
    setTotal(Math.floor(temptotal));
  }
}

  return (<>
    <View style={styles.container}>
    <Header 
    title='Recommandation'
    flex={0.1}
    marginLeft={13}
    possiton={92}
    />
     <View style={{flex:0.7,alignItems:'center',backgroundColor:'#ffffff80',width:'90%',alignSelf:'center',borderRadius:50,bottom:'5%'}}>
    <View style={{paddingTop:'8%',alignItems:'center'}}>
     {total&&total!=0?<><Text style={styles.txt}>The injection recommandation for you is</Text>
     <Text style={{fontWeight:'bold',fontSize:18}}> {total} units </Text></>:<></>}
     {fixunit&&fixunit!=0?<Text style={styles.txt}>ratio of fix injection {fixunit} units </Text>:<></>}
     {foodUnit&&foodUnit!=0?<Text style={styles.txt}>ratio of cabs injection {foodUnit} units </Text>:<></>}
     </View>
     <Image
      style={styles.Image}
      source={{uri:ImageUri+'rec.png'}}
      />


<Text style={styles.txt}>do you use the recommandation?</Text>
<View style={{flexDirection:'row',justifyContent: 'space-evenly',flex:0.25,paddingLeft:'15%',marginTop:'2%'}}>
<Button
alignItems='center'
width={6}
height={5}
text='yes'
radius={10}
/>
<Button
alignItems='flex-start'
width={9}
height={5}
text='no'
radius={10}
/>
</View>

     </View>

    </View>
    {/* <View style={{position:'absolute',bottom:'0%',left:'28%'}}>
<Button
     flex={1}
alignItems='center'
width={15}
height={5}
text='back'
radius={10}
textSize={20}
onPress={()=>{navigation.goBack()}}
/>
</View> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
}, 
Image: {
  flex:0.75,
  // position:'absolute',
  resizeMode: 'contain',
  width: '100%',
  height:'100%',
  // top: '26%',
  bottom:'1%',
  opacity: 0.85,
},
txt:{
fontSize:16,
flexWrap:'wrap',
padding:'1%',paddingHorizontal:'5%'
}
})