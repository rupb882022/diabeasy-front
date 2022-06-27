import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../CTools/Button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../../CTools/Input';
import Header from '../../CTools/Header';
import { Get_all_unit, Serch_food,Post_Food } from '../../Functions/Function'
import Alert from '../../CTools/Alert';
import MultiSelectInput from '../../CTools/MultiSelectInput';
import FoodList from './FoodList';
import SelectedList from './SelectedList';

export default function AddNewFood(props) {
  const { navigation, route } = props

  let categoryList = route.params.categoryList;//list of category
  let isRecipe = route.params.isRecipes;
  let userId = route.params.userId;
  let food_List = route.params.foodList//Ingredients List
  const [show, setShow] = useState(false);

  const [category, setCategory] = useState();//array of the categories of the food that will added
  const [name, setName] = useState();
  const [unit, setUnit] = useState();
  const [crabs, setCrabs] = useState();
  const [suger, setSuger] = useState();
  const [weightInGrams, setWeightInGrams] = useState();
  const [unitList, setUnitList] = useState();
  const [cookingMethod, setCookingMethod] = useState();
  const [alert, setAlert] = useState()
  const [serchName, setSerchName] = useState('');
  const [serchCategory, setSerchCategory] = useState();
  const [myFoodList, setMyFoodList] = useState([]);//the chosen food list
  const [myFoodDtails, setmyFoodDtails] = useState({ carbs: 0.0, suger: 0.0, grmas: 0 });//the details on chosen food list
  const [foodList, setFoodList] = useState(food_List);

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
          console.log("error in function Get_all_unit, page:add new food", error)
        })
    }
  }, []);


  const Serch_food_by_name = () => {
    if (serchName) {
      Serch_food(serchName, userId ? userId : 0,'getIngredients').then((resulte) => {
        if (!resulte || resulte.length < 0 || resulte[0].id == 0) {
          setAlert(<Alert text="no resulte"
            type='worng'
            time={3500}
            bottom={250}
          />)
        }
        setFoodList(resulte)

      },
        (error) => {
          setAlert(
            <Alert text={`sorry we cannot find ${serchName} right now`} 
              type='worng'
              bottom={250}
            />)
          console.log("error in function Serch_food_by_name page: add new food ", error)

        })
    } else {
      setAlert(
        <Alert text='cannot serch with empty value'
          type='alert'
          bottom={250}
        />)
    }
  }
  useEffect(() => {
    let List;
    if (serchCategory) {
      //fillter by category
      List = food_List.filter(x =>
        x.category.length < 1 ?
          x.category[0].id == serchCategory :
          x.category.find(z => z.id == serchCategory)
      );
    } else {
      List = food_List;
    }
    setFoodList(List);

  }, [serchCategory]);

  const saveFood = () => {
    if(category.length <= 0){
      setAlert(<Alert text="select category please"
      type='alert'
        time={2000}
        bottom={80}
      />);
      return;
    }
    if (isRecipe) {
      if (name && category && unit && weightInGrams && myFoodDtails.Ingridents && myFoodDtails.Ingridents.length > 0  ) {

        let ratio = parseFloat(weightInGrams / myFoodDtails.grams)

        let food = {
          userId: userId,
          name: name,
          category: category,
          cookingMethod: cookingMethod,
          TotalCarbs: myFoodDtails && myFoodDtails.carbs,
          TotalSuger: myFoodDtails && myFoodDtails.suger,
          TotalGrams: myFoodDtails && myFoodDtails.grams,
          unit: unit,
          carbs: parseFloat(myFoodDtails.carbs * ratio),
          suger: parseFloat(myFoodDtails.suger * ratio),
          weightInGrams: weightInGrams,
          Ingridents: myFoodDtails.Ingridents
        }
        
        Post_Food('AddRecipe',food).then((response) => {
              response&&navigation.goBack()
          })
          .catch((error) => {
            setAlert(
              <Alert text="sorry somthing went worng try agine later"
              type='worng'
                time={2000}
                bottom={80}
              />)
            console.log("error in function Post_Food "+error);
          })

      } else {
        setAlert(
          <Alert text="please fill in all details"
            type='alert'
            time={2500}
            bottom={80}
          />)

      }

    } else {
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
        Post_Food('AddIngredient',food).then((response) => {
              response&&navigation.goBack()
          })
          .catch((error) => {
            setAlert(
              <Alert text="sorry somthing went worng try agine later"
              type='worng'
                time={2000}
                bottom={80}
              />)
              console.log("error in function Post_Food "+error);
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
    let Ingridents = []
    let carbs = 0
    let suger = 0
    let grams = 0
    if (list.length > 0)
      list.map(x => {
        carbs += parseFloat(x.carbs)
        suger += parseFloat(x.suger)
        grams += parseInt(x.grams)
        Ingridents.push({ id: x.id, amount: x.amount, unit: x.unit })
      })
    carbs = carbs.toFixed(1)
    suger = suger.toFixed(1)
    setmyFoodDtails({ carbs: carbs, suger: suger, grams: grams, Ingridents: Ingridents })
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
            <Alert text='Ingredient added to list'
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
      flex={0.22}
      title={isRecipe ? 'Add Recipe' : 'Add Ingredient'}
      marginLeft={isRecipe ? 0 : -1}
      line={false}
      possiton={-36}
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
        <View style={{ flexDirection: 'row', flex: 1, marginLeft: '6%' }}>
          <Input
            label='unit'
            alignItems='center'
            editable={false}
            width={70}
            height={45}
            getValue={(value) => setUnit(value)}
            type='selectBox'
            SelectBox_placeholder='Select unit of measure'
            selectBox_items={unitList ? unitList : []}
          />
          <Input
            label='weight in grams'
            validtion='number'
            width={72}
            height={45}
            alignItems='flex-start'
            keyboardType='numbers-and-punctuation'
            getValue={(value) => setWeightInGrams(value)}
          />
        </View>
        {isRecipe && <Input
          placeholder='cooking method'
          multiline={true}
          numberOfLines={4}
          width={72}
          height={90}
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setCookingMethod(value)}
        />}
        {!isRecipe && <Input
          label='suger'
          validtion='float'
          keyboardType='numbers-and-punctuation'
          getValue={(value) => setSuger(value)}
        />}
        {!isRecipe ? <Input
          label='carbohydrates'
          validtion='float'
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
                placeholder='ingredient name'
                width={110}
                alignItems='flex-start'
                getValue={(value) => setSerchName(value)}
              />
              <Button
                alignItems='center'
                justifyContent='center'
                text='Search'
                height={4}
                radius={5}
                textSize={14}
                onPress={() => { Serch_food_by_name(); }}
              />
            </View>

          </>}
        {isRecipe && foodList && foodList.length > 0 && <FoodList
          foodList={foodList}
          forRecipe={true}
          addToMyListFood={(value) => { addToMyListFood(value) }} />}
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
          onPress={() => { navigation.navigate('CameraUse', { imageName: isRecipe ? 'recipe' : 'Ingredient' }) }}
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
    paddingTop: '10%'
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
    marginTop: '3%',
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