import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import FlipCard from 'react-native-flip-card'
import Input from '../../CTools/Input';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '../../CTools/CheckBox';


export default function ingredient(props) {
  const { name, image, id, UnitOfMeasure } = props

  const selectUnit = [];
  UnitOfMeasure.map(x => selectUnit.push(
    {
      itemKey: x.id,
      label: x.name,
      value: x.name
    }))

  const [unit, setUnit] = useState();
  const [favorite, setFavorite] = useState(false);
  const [crabs, setCrabs] = useState();
  const [amount, setAmount] = useState();
console.log("UnitOfMeasure",UnitOfMeasure);

  useEffect(() => {
    // console.log("amount",amount);
    // console.log("unit",unit);
    if(amount&&unit){
    calcCarbs(amount,unit)
  }}, [unit,amount]);

const calcCarbs=(amount,unit)=>{
      //clac crabs when user select Unit Of Measure
      let temp = UnitOfMeasure.find(x => x.name == unit)
      // console.log("temp",temp);
      let calc= unit=="grams"?temp.carbs*parseFloat(amount/100):temp.carbs*amount
      //if there is a unit for ingredient
      calc && setCrabs(calc.toFixed(1))
}

  return (
    <View style={styles.container} id={id}>
      <FlipCard
        // style={styles.card(index)}
        friction={15} //The friction of card animation
        perspective={1000} //The amount of perspective applied to the flip transformation
        flipHorizontal={true}
        flipVertical={false} //If you set false, a card not flip to vertical. If you set true both flipHorizontal and flipVertical , a card flip to diagonal.
        flip={false}  //start side flase=face true=back
        clickable={true}>
        <View style={styles.face}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.frontTitle}>{name}
            </Text>
            {favorite ?
              <TouchableOpacity onPress={() => setFavorite(false)}><Ionicons style={styles.icon} name="heart-sharp" size={24} color="#FF3C3C" /></TouchableOpacity> :
              <TouchableOpacity onPress={() => setFavorite(true)}><Ionicons style={styles.icon} name="heart-outline" size={24} color="black" /></TouchableOpacity>
            }
          </View>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.details}>
          <Text style={styles.textFront}>{UnitOfMeasure[0].suger} suger </Text> 
          <Text style={styles.textFront} > {UnitOfMeasure[0].carbs} Carbs  </Text> 
          <Text style={styles.textFront}>{UnitOfMeasure[0].weightInGrams} g </Text>
          </View>
          {/* <Text style={{textAlign:'center'}}>cooking method</Text> */}
        </View>

        <View style={styles.back}>
          <Text style={styles.backTitle}>Carbohydrates: {crabs && crabs}</Text>
          <View style={{ width: '90%' }}>
            <Input
              label='Unit of measure'
              height={40}
              width={100}
              editable={false}
              type='selectBox'
              getValue={(value) => setUnit(value)}
              SelectBox_placeholder='Select Unit of measure'
              selectBox_items={selectUnit} />
            <Input
              label='Amount'
              // validtion='number'
              justifyContent='flex-start'
              keyboardType='decimal-pad'
              height={40}
              width={100}
              getValue={(value) => setAmount(value)}
            />
            <View style={styles.checkbox}>
              <CheckBox />
              <Text style={styles.checkBoxText}>Add</Text>
            </View>
          </View>
        </View>
      </FlipCard>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
    // paddingLeft: '3%',
    width: '100%',
    
  },
  image: {
    width: '35%',
    height: '70%',
// alignSelf:'flex-start',
    resizeMode: 'contain',
  },
  //todo full width element
  face: {
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    
  },
  faceTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  back: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#FFCF84",
    paddingTop: '5%'
  },
  backTitle: {
    marginBottom: '2%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textFront: {
   fontSize:19
  },
  details:{
flexDirection:'row',
justifyContent:'space-evenly',
backgroundColor: "#FFCF84",
  },
  icon: {
    textAlign: 'center',
  paddingRight:'2%'
  },
  checkbox: {
    // justifyContent: 'flex-start',
    bottom: '5%',
    flexDirection: 'row',
    paddingLeft: '30%'
  }, checkBoxText: {
    textAlign: 'left',
    paddingRight: '50%',
    fontSize: 11,
    alignSelf: 'flex-end'
  },
  frontTitle:{
     fontSize: 25,
     textAlign:'left',
      paddingLeft: '8%' 
  }
})
