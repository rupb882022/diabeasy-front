import { View, Text ,StyleSheet,SafeAreaView,ScrollView,StatusBar } from 'react-native'
import React from 'react'
import HipoFood from './HipoFood';
import Button from '../../CTools/Button';

export default function HipoRec({route,navigation}) {

  let hipoFood = route.params && route.params.hipoFood ? route.params.hipoFood : '';

 

  return (
<>
      <Text style={styles.title}>These foods helped you last time</Text>
    <ScrollView contentContainerStyle={styles.container}>
    { hipoFood&&hipoFood.map((x,i)=>{
      return<HipoFood 
      key={i}
    amount={x.amount}
    blood_sugar_level={x.blood_sugar_level}
    next_blood_sugar_level={x.blood_sugar_level1}
    date_time={x.date_time}
    image={x.image}
    Unit_name={x.name}
    food_name={x.name1}
    totalCarbs={x.totalCarbs}
  />})}
{hipoFood&&hipoFood.length%2!==0&&
  <HipoFood 
     hide={true}
  />
}
    </ScrollView>
  <Button
  text='back'
  width={6}
  height={3}
  radius={8}
  alignItems='center'
  justifyContent='center'
  onPress={()=>{navigation.goBack()}}
  />
</>
  )
}

const styles = StyleSheet.create({

    container: {
      // flex: 1,
      flexDirection: 'row',
     flexWrap: 'wrap',
      padding: 10 ,
width:'100%'
  },title:{
    alignSelf:'center',
    marginTop:'18%',
    fontSize:22,
    // marginBottom:'5%',
    padding:'4%',
    color:'white',
    backgroundColor:'#00a6a64a'
  }
})