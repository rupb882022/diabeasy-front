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
  const [suger, setSuger] = useState();
  const [amount, setAmount] = useState();
  const [weightInGrams, setWeightInGrams] = useState();

  useEffect(() => {
    // console.log("amount",amount);
    // console.log("unit",unit);
    if (amount && unit) {
      calcDetails(amount, unit)
    }else{
       setCrabs(null)
      setSuger(null)
      setWeightInGrams(null)
    }
  }, [unit, amount]);

  const calcDetails = (amount, unit) => {
    console.log("UnitOfMeasure",UnitOfMeasure)
    //clac crabs when user select Unit Of Measure
    let temp = UnitOfMeasure.find(x => x.name == unit)
    let crabs = unit == "grams" ? temp.carbs * parseFloat(amount / 100) : temp.carbs * amount
    let suger = unit == "grams" ? temp.suger * parseFloat(amount / 100) : temp.suger * amount
    let weightInGrams=unit == "grams"? amount:temp.weightInGrams*amount
console.log("temp",temp);
    //if there is a unit for ingredient
    crabs && setCrabs(crabs.toFixed(1))
    suger&&setSuger(suger.toFixed(1))
    temp&&setWeightInGrams(weightInGrams)
  }

  return (
    <View style={styles.container} id={id}>
        <View style={styles.face}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.frontTitle}>{name}
            </Text>
            {favorite ?
              <TouchableOpacity onPress={() => setFavorite(false)}><Ionicons style={styles.icon} name="heart-sharp" size={24} color="#FF3C3C" /></TouchableOpacity> :
              <TouchableOpacity onPress={() => setFavorite(true)}><Ionicons style={styles.icon} name="heart-outline" size={24} color="black" /></TouchableOpacity>
            }
          </View>

          <View style={styles.row}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.details}>
              <Text style={styles.textFront}>{suger?suger:UnitOfMeasure[0].suger} suger </Text>
              <Text style={styles.textFront} >{crabs?crabs:UnitOfMeasure[0].carbs} Carbs  </Text>
              <Text style={styles.textFront}>{weightInGrams?weightInGrams:UnitOfMeasure[0].weightInGrams} g </Text>
            </View>
          </View>
          <View style={styles.faceFooter}>
            <Input
              placeholder={UnitOfMeasure[0].name}
              height={50}
              width={100}
              textAlign='center'
              flex={0.4}
              editable={false}
              type='selectBox'
              getValue={(value) => setUnit(value)}
              SelectBox_placeholder='Select Unit of measure'
              selectBox_items={selectUnit} />
            <Input
              placeholder='Amount'
              // validtion='number'
              textAlign='center'
              keyboardType='decimal-pad'
              height={50}
              flex={0.25}
              width={100}
              getValue={(value) => setAmount(value)}
            />
            <View style={styles.checkbox}>
              <CheckBox />
              <Text style={styles.checkBoxText}>Add</Text>
            </View>
          </View>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
    width: '100%',
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowOpacity:50,
  },
  image: {
    width: '35%',
    height: '90%',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  face: {
    width: '100%',
    height: 160,
    backgroundColor: 'white',

  },
  faceTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  textFront: {
    fontSize: 16,
    marginTop: '10%'
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  icon: {
    textAlign: 'center',
    paddingRight: '2%'
  },
  checkbox: {
    flexDirection: 'row',
    flex: 0.2,
    alignSelf: 'center',
    paddingRight:'2%',
    right:'2%'
  },
  checkBoxText: {
    textAlign: 'left',
  },
  frontTitle: {
    fontSize: 22,
    top:'1%',
    fontWeight:'bold',
    paddingLeft: '35%'
  }, 
  row: {
    flex: 1,
    flexDirection: 'row'
  }, 
  faceFooter: {
    flex: 0.4,
    justifyContent:'space-evenly',
    flexDirection: 'row',
    backgroundColor: "#FFCF84",
    paddingLeft: '2%'
  }
})
