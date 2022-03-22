import { View, Text, StyleSheet,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../CTools/Button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../../CTools/Input';
import Header from '../../CTools/Header';
import apiUrl from '../../Routes/Url'
import axios from "axios";
import Alert from '../../CTools/Alert';

export default function AddNewFood(props) {
  const { navigation, route } = props

  let categoryList = route.params.categoryList;
  let isRecipe = route.params.isRecipes;
  let userId = route.params.userId;

  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [unit, setUnit] = useState();
  const [crabs, setCrabs] = useState();
  const [suger, setSuger] = useState();
  const [weightInGrams, setWeightInGrams] = useState();
  const [unitList, setUnitList] = useState();
  const [alert, setAlert] = useState()

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
        //todo alert
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

  const saveFood = () => {
if(name&&category&&unit&&crabs&&suger&&weightInGrams){
    let food = {
      userId:userId,
      name: name,
      category: category,
      unit: unit,
      carbs: crabs,
      suger: suger,
      weightInGrams: weightInGrams
    }
    console.log("food", food);


    const configurationObject = {
      url: `${apiUrl}Food/AddIngredient`,
      method: "POST",
      data: food
    };

   
    axios(configurationObject)
      .then((response) => {
        if (response) {
          console.log("response",response.status);

          navigation.goBack()
        }else{
          throw new Error(response.status);
        }
      })
      .catch((error) => {
        setAlert(
          <Alert text="sorry somting is got worng try agine later"
          type='worng'
          time={2000}
          bottom={110}
          />)
          console.log(error);
      })
    }else{
      setAlert(
        <Alert text="please fill in all details"
        type='alert'
        time={2500}
        bottom={80}
        />)
    }
  }

  return (<>
    <View style={styles.container}>
      <Header
        title={isRecipe ? 'Add Recipe' : 'Add Ingredient'}
        marginLeft={isRecipe ? 0 : 7}
        line={false}
        possiton={-15}
      />
      <Input
        label='Name'
        getValue={(value) => setName(value)}
      />
      <Input
        label='category'
        editable={false}
        getValue={(value) => setCategory(value)}
        type='selectBox'
        SelectBox_placeholder='Select category'
        selectBox_items={categoryList}
      />
      <Input
        label='unit'
        editable={false}
        getValue={(value) => setUnit(value)}
        type='selectBox'
        SelectBox_placeholder='Select category'
        selectBox_items={unitList ? unitList : []}
      />
      <Input
        label='suger'
        // validtion='number'
        keyboardType='numbers-and-punctuation'
        getValue={(value) => setSuger(value)}
      />
      <Input
        label='carbohydrates'
        // validtion='number'
        keyboardType='numbers-and-punctuation'
        getValue={(value) => setCrabs(value)}
      />
      <Input
        label='weightInGrams'
        validtion='number'
        keyboardType='numbers-and-punctuation'
        getValue={(value) => setWeightInGrams(value)}
      />
      <View style={styles.row}>
        <View style={styles.uploadbutton}>
          <Text>Upload image</Text>
          <Button
            element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />}
            width={8}
            height={4}
            onPress={() => { navigation.navigate('CameraUse', { imageName: isRecipe ? 'Recipe' : 'Ingredient' }) }}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            height={6}
            width={20}
            text='save'
            justifyContent='center'
            onPress={saveFood}
          />
          <Button
            height={6}
            width={8}
            text='back'
            justifyContent='center'
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
      {alert&&alert}</>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  uploadbutton: {
    flex: 1,
    paddingLeft: '12%'
  }, buttons: {
    flex: 2.2,
    flexDirection: 'row',
    marginBottom: '6%'
  }
})