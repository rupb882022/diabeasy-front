import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import apiUrl from '../../Routes/Url'
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
      fetch(apiUrl + `Food/getUnitOfMeasure`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'appliction/json; charset=UTF-8',
          'Accept': 'appliction/json; charset=UTF-8'
        })
      }).then(res => {
        console.log("res", res.status);
        if (res && res.status == 200) {
          return res.json();
        } else {
          console.log("status code:", res.status)
        }
      }).then((resulte) => {
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
    const configurationObject = {
      url: `${apiUrl}food/addunit/${foodId}`,
      method: "POST",
      data: unitDetails
    };
console.log(unitDetails);
console.log(`${apiUrl}food/addunit/${foodId}`);
    axios(configurationObject)
      .then((response) => {
        console.log("status=", response.status)
        if (response.status === 201) {
          navigation.goBack();
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        setAlert(
          <Alert text="sorry somting is got wotng try agine later"
            type='worng'
            time={2000}
            bottom={80}
          />)
        console.log(error.response.data);
      }
      )
  }


  return (
    <View style={styles.container}>
      <Header
        title='add unit'
        flex={0.5}
        possiton={5}
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
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setCrabs(value)}
        />
        <Input
          label='suger'
          validtion='float'
          width={80}
          height={50}
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setSuger(value)}
        />
        <Input
          label='weight in grams'
          validtion='number'
          width={80}
          height={50}
          keyboardType='numbers-and-punctuation'
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

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputs: {
    flex: 1
  },
  Buttons: {
    flex: 1,
    flexDirection: 'row'
  }
})