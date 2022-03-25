import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../CTools/Button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../../CTools/Input';
import Header from '../../CTools/Header';
import apiUrl from '../../Routes/Url'
import axios from "axios";
import Alert from '../../CTools/Alert';
import MultiSelectInput from '../../CTools/MultiSelectInput';
import FoodList from './FoodList';
import SelectedList from './SelectedList';

export default function AddNewFood(props) {
  const { navigation, route } = props

  let categoryList = route.params.categoryList;//list of category
  let isRecipe = route.params.isRecipes;
  let userId = route.params.userId;
  let foodList = route.params.foodList//Ingredients List
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState();//array of the categories of the food that will added
  const [name, setName] = useState();
  const [unit, setUnit] = useState();
  const [crabs, setCrabs] = useState();
  const [suger, setSuger] = useState();
  const [weightInGrams, setWeightInGrams] = useState();
  const [unitList, setUnitList] = useState();
  const [alert, setAlert] = useState()
  const [serchName, setSerchName] = useState();
  const [serchCategory, setSerchCategory] = useState();
  const [myFoodList, setMyFoodList] = useState([]);//the chosen food list
  const [myFoodDtails, setmyFoodDtails] = useState({ carbs: 0.0, suger: 0.0, food: [] });//the details on chosen food list

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
    if (isRecipe) { } else {
      if (name && category && unit && crabs && suger && weightInGrams) {
        let food = {
          userId: userId,
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
              console.log("response", response.status);

              navigation.goBack()
            } else {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            setAlert(
              <Alert text="sorry somting is got worng try agine later"
                type='worng'
                time={2000}
                bottom={80}
              />)
            console.log(error);
          })
      } else {
        setAlert(
          <Alert text="please fill in all details"
            type='alert'
            time={2500}
            bottom={80}
          />)
      }
    }
  }
  //calc Dtails for food list
  const calc_myFoodDtails = (list) => {

    let carbs = 0
    let suger = 0
    if (list.length > 0)
      list.map(x => {
        carbs += parseFloat(x.carbs)
        suger += parseFloat(x.suger)
      })
    carbs = carbs.toFixed(1)
    suger = suger.toFixed(1)
    setmyFoodDtails({ carbs: carbs, suger: suger })
  }

  //insert food to my list
  const addToMyListFood = (food) => {
    var temp
    //check if food need to add or delete
    if (food.add) {
      //cheak if user fill in unit and amount
      if (food.suger != 0 || food.carbs != 0) {
        //check if item is allready in the list
        if (myFoodList.find(x => x.id == food.id)) {
          setAlert(<Alert text='Ingredient is allready in your list'
            type='alert'
            time={3000}
            bottom={80} />)
          return;
        } else {
          temp = myFoodList;
          temp.push(food);
          setAlert(
            <Alert text='Ingredient add to list'
              type='success'
              bottom={80}
            />)
        }
      } else {
        setAlert(<Alert text={'select unit and amount to add food item'}
          type='alert'
          time={3000}
          bottom={80} />)
        return;
      }
    }//if food item was delete 
    else {
      temp = myFoodList.filter(x => x.id != food.id)
    }
    setMyFoodList(temp);
    calc_myFoodDtails(temp);
  }

  return (<>
    <Header
      flex={0.4}
      title={isRecipe ? 'Add Recipe' : 'Add Ingredient'}
      marginLeft={isRecipe ? 0 : 7}
      line={false}
      possiton={-15}
    />
    <SafeAreaView style={styles.containerView}>
      <ScrollView style={styles.container}>
        <MultiSelectInput
          data={categoryList}
          getValue={(value) => setCategory(value)}
        />
        <Input
          label='Name'
          getValue={(value) => setName(value)}
        />
        {/* <Input
          label='category'
          editable={false}
          getValue={(value) => setCategory(value)}
          type='selectBox'
          SelectBox_placeholder='Select category'
          selectBox_items={categoryList}
        /> */}

        <Input
          label='unit'
          editable={false}
          getValue={(value) => setUnit(value)}
          type='selectBox'
          SelectBox_placeholder='Select unit of measure'
          selectBox_items={unitList ? unitList : []}
        />
        <Input
          label='weightInGrams'
          validtion='number'
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setWeightInGrams(value)}
        />
        {!isRecipe && <Input
          label='suger'
          // validtion='number'
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setSuger(value)}
        />}
        {!isRecipe ? <Input
          label='carbohydrates'
          // validtion='number'
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setCrabs(value)}
        />
          : <>
            <Text style={styles.selectIngrident}>Select Ingredient for recipe</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Input
                label='Category'
                type='selectBox'
                height={50}
                width={80}
                selectBox_items={categoryList}
                SelectBox_placeholder='Select category'
                getValue={(value) => setSerchCategory(value)}
              />
              <Input
                height={50}
                label='food name'
                width={110}
                alignItems='flex-start'
                getValue={(value) => setSerchName(value)}
              />
              <Button
                alignItems='center'
                justifyContent='center'
                text='Serch'
                height={4}
                radius={5}
                textSize={14}
              />
            </View>
            <FoodList
              foodList={foodList}
              forRecipe={true}
              addToMyListFood={(value) => { addToMyListFood(value) }}
            /></>}
        {/* <Button
        text='Add exstra unit of measure'
        justifyContent='center'
        alignItems='center'
        textSize={15}
        width={13}
        height={2}
        /> */}

      </ScrollView>
    </SafeAreaView >
    <View style={styles.row}>
      <View style={styles.uploadbutton}>

      </View>
      <View style={styles.buttons}>
        <Button
          element={<MaterialCommunityIcons name="camera-plus-outline" size={25} color="white" />}
          width={15}
          height={5}
          alignItems='center'
          onPress={() => { navigation.navigate('CameraUse', { imageName: isRecipe ? 'Recipe' : 'Ingredient' }) }}
        />
        {isRecipe &&
          <Button
            height={6}
            width={10}
            textSize={16}
            text='my list'
            alignItems='flex-end'
            onPress={() => { setShow(true) }}
          />
        }
        <Button
          height={6}
          width={20}
          text='save'
          alignItems='flex-start'
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
    {show && <SelectedList
      setShow={setShow}
      show={show}
      myFoodList={myFoodList}
      myFoodDtails={myFoodDtails}
      addToMyListFood={addToMyListFood}
    />}
    {alert && alert}</>
  )
}
const styles = StyleSheet.create({
  containerView: {
    flex: 2
  },
  container: {
    paddingTop: '1%'
  },
  row: {
    flexDirection: 'row',
    flex: 0.4
  },
  uploadbutton: {
    flex: 1,
    paddingLeft: '12%',
    paddingTop: '3%'
  },
  buttons: {
    flex: 400,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginBottom: '6%',
    marginLeft: '7%'
  },
  selectIngrident: {
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#1EA6D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: '3%'
  }
})