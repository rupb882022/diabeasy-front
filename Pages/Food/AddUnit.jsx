import { View, StyleSheet, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import React, { useState, useEffect } from 'react'
import {Get_all_unit,Post_unit} from '../../Functions/Function'
import Alert from '../../CTools/Alert';
import Button from '../../CTools/Button';
import Input from '../../CTools/Input';
import Header from '../../CTools/Header';

export default function AddUnit(props) {
  const { navigation, route } = props
  let foodId = route.params.foodId;

  const [unitList, setUnitList] = useState();

  const [carbs, setCrabs] = useState();
  const [suger, setSuger] = useState();
  const [weightInGrams, setWeightInGrams] = useState();
  const [unit, setUnit] = useState();
  const [alert, setAlert] = useState();


  //get all unit of measure
  useEffect(() => {
    if (!unitList) {
      Get_all_unit().then((resulte) => {
        if (resulte) {
          let temp = resulte.map(x => ({ itemKey: x.id, label: x.name, value: x.id }))
          resulte && setUnitList(temp)
        }
      },
        (error) => {
          console.log("error", error)
        })
    }
  }, []);

  const add_unit = () => {

    let unitDetails = {
      id: unit,
      carbohydrates: carbs,
      sugars: suger,
      weightInGrams: weightInGrams,
    }
    Post_unit(foodId,unitDetails).then((response) => {
        response&&navigation.goBack();
      })
      .catch((error) => {
        setAlert(
          <Alert text="sorry somting is got wotng try agine later"
            type='worng'
            time={2000}
            bottom={80}
          />)
        console.log("error in function Post_unit"+error);
      }
      )
  }


  return (
//     <KeyboardAvoidingView
//     behavior={Platform.OS === "ios" ? "padding" : "height"}
//     style={{ flex: 1 }}
// >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Header
        title='add unit'
        flex={0.17}
        possiton={-45}
        paddingRight={5}
        line={false}
      />
      <View style={styles.inputs}>
        <Input
          label='unit'
          alignItems='center'
          editable={false}
          width={80}
          height={50}
          getValue={(value) => setUnit(value)}
          type='selectBox'
          SelectBox_placeholder='Select unit of measure'
          selectBox_items={unitList ? unitList : []}
        />
        <Input
          label='carbohydrates'
          validtion='float'
          width={80}
          height={50}
          
          keyboardType='numeric'
          getValue={(value) => setCrabs(value)}
        />
        <Input
          label='suger'
          validtion='float'
          width={80}
          height={50}
          keyboardType='numeric'
          getValue={(value) => setSuger(value)}
        />
        <Input
          label='weight in grams'
          validtion='number'
          width={80}
          height={50}
          keyboardType='decimal-pad'
          getValue={(value) => setWeightInGrams(value)}
        />
      </View>
      <View style={styles.Buttons}>
        <Button
          text='back'
          alignItems='center'
          justifyContent='center'
          onPress={() => { navigation.goBack(); }}
        />
        <Button
          text='add'
          alignItems='center'
          justifyContent='center'
          onPress={() => { add_unit(); }}
        />

      </View>
      {alert && alert}
    </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputs: {
    flex: 1,paddingTop:'25%'
    
  },
  Buttons: {
    flex: 1,
    flexDirection: 'row'
  }
})