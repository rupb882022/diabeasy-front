import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import HipoFood from './HipoFood';
import Button from '../../CTools/Button';

export default function HipoRec({ route, navigation }) {

  let hipoFood = route.params && route.params.hipoFood ? route.params.hipoFood : '';

  const [hipo_Food, sethipoFood] = useState(hipoFood);
  const [list, setList] = useState();
  const [color, setColor] = useState('date');
  let Dcolor = '#646363cc';
  const order_by = async(val) => {
    setList([])
    let temp = hipo_Food;
    let Tcolor = '';
    switch (val) {
      case 'date':
        temp.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        Tcolor = 'date'
        break;
      case 'times_eaten':
        temp.sort((a, b) => b.times_eaten - a.times_eaten);
        Tcolor = 'times_eaten'
        break;
      case 'carbs':
        temp.sort((a, b) => b.totalCarbs - a.totalCarbs);
        Tcolor = 'carbs'
        break;

    }
    sethipoFood(temp)
    setColor(Tcolor)
  }


  useEffect(() => {
    hipo_Food && setList(hipo_Food)
  }, [color])
  
  return (<>
    <View style={{ flex: 0.95 }}>
      {/* <Text style={styles.title}>These foods helped you last time</Text> */}
      <Text style={styles.title}>Rise up your suger level</Text>
      <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, width: '91.5%', alignSelf: 'center', backgroundColor: '#d7fcf49c', }}>
        <Text style={styles.orderBy}>Order by:</Text>
        <TouchableOpacity onPress={() => { order_by('date'); }} style={styles.button}><Text style={styles.text(color == 'date' ? '#00a6a685' : Dcolor)}>Date</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { order_by('times_eaten'); }} style={styles.button}><Text style={styles.text(color == 'times_eaten' ? '#00a6a685' : Dcolor)}>Times eaten</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { order_by('carbs'); }} style={styles.button}><Text style={styles.text(color == 'carbs' ? '#00a6a685' : Dcolor)}>Total carbs</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {list && list.map((x, i) => {
          return <HipoFood
            key={i}
            position={i + 1}
            // amount={x.amount}
            blood_sugar_level={x.blood_sugar_level}
            next_blood_sugar_level={x.blood_sugar_level_2H}
            date_time={x.date_time}
            Food={x.food}
            times_eaten={x.times_eaten}
            // image={x.image}
            // Unit_name={x.UnitName}
            // food_name={x.FoodName}
            totalCarbs={x.totalCarbs}
          // count={x.count}
          />
        })}
        {hipoFood && hipoFood.length % 2 !== 0 &&
          <HipoFood
            hide={true}
          />
        }
      </ScrollView>

    </View>
    <Button
      text='Back'
      width={6}
      height={3}
      flex={0.1}
      radius={8}
      alignItems='center'
      justifyContent='center'
      onPress={() => { navigation.goBack() }}
    /></>
  )
}

const styles = StyleSheet.create({

  container: {
    //  flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    width: '100%',
    // height:'60%'
  }, title: {
    alignSelf: 'center',
    marginTop: '18%',
    width:'90%',
    fontSize: 22, backgroundColor: '#00a6a64a',
    // marginBottom:'5%',
    padding: '4%',
    color: 'white',textAlign:'center'

  }, button: {


  },
  text: (color) => {
    return {
      fontSize: 16,
      paddingRight: '4%',
      paddingLeft: '1%',
      paddingVertical: '2%',
      color: color

    }
  }, orderBy: {
    fontSize: 16,
    paddingRight: '4%',
    paddingLeft: '1%',
    paddingVertical: '2%',

    // marginLeft:'5%'
  }
})