import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../CTools/Button';
import GoodFood from './GoodFood';

export default function FoodRec({ route, navigation }) {

  let Food = route.params && route.params.Food ? route.params.Food : '';

  const [food, setFood] = useState(Food);
  const [color, setColor] = useState('name');
  const [list, setList] = useState();

  let Dcolor = '#646363cc';

  const order_by = async(val) => {
    setList([])
    let temp = Food;
    let Tcolor = '';
    switch (val) {
      case 'name':
        temp.sort((a, b) => a.food_name.localeCompare(b.food_name))
        Tcolor = 'name'
        break;
      case 'foodCount':
        temp.sort((a, b) => b.foodCount - a.foodCount);
        Tcolor = 'foodCount'
        break;
      case 'ratio':
        temp.sort((a, b) => b.ratio - a.ratio);
        Tcolor = 'ratio'
        break;

    }
    setFood(temp)
    setColor(Tcolor)
  }

console.log("list",food)
  useEffect(() => {
    food && setList(food)
  }, [color])
  return (<>
    <View style={{ flex: 0.95 }}>
      <Text style={styles.title}>These foods was good for you last time</Text>
      <View style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, width: '91.5%', alignSelf: 'center', backgroundColor: '#d7fcf49c', }}>
        <Text style={styles.orderBy}>order by:</Text>
        <TouchableOpacity onPress={() => { order_by('name'); }} style={styles.button}><Text style={styles.text(color == 'name' ? '#00a6a685' : Dcolor)}>name</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { order_by('foodCount'); }} style={styles.button}><Text style={styles.text(color == 'foodCount' ? '#00a6a685' : Dcolor)}>Times eaten</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { order_by('ratio'); }} style={styles.button}><Text style={styles.text(color == 'ratio' ? '#00a6a685' : Dcolor)}>percentage</Text></TouchableOpacity>
      </View>
       <ScrollView contentContainerStyle={styles.container}>
         {list && list.map((x, i) => {
          return <GoodFood
            key={i}
            hide={false}
            position={i + 1}
            Food_image={x.image}
            countGood={x.countGood}
            foodCount={x.foodCount}
            food_id={x.food_id}
            food_name={x.food_name}
            ratio={x.ratio}
          />
        })}
        {list && list.length % 2 !== 0 &&
          <GoodFood
            hide={true}
          />
        } 
      </ScrollView> 

    </View>
    <Button
      text='back'
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    width: '100%',
  }, title: {
    alignSelf: 'center',
    marginTop: '18%',
    fontSize: 18, backgroundColor: '#00a6a64a',
    padding: '4%',
    color: 'white',

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