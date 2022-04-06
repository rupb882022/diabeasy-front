import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../CTools/Input';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Button from '../../CTools/Button';
import { ImageUri } from '../../Routes/Url';
import PopUp from '../../CTools/PopUp';
import axios from "axios";
import { UserContext } from '../../CTools/UserDetailsHook';
import apiUrl from '../../Routes/Url'
import Alert from '../../CTools/Alert';

export default function Food(props) {
  const { name, image, id, UnitOfMeasure, addToMyListFood, Ingrediants, cookingMethod, addByUserId, forRecipe, isFavorit, setAlert,get_all_food
  ,update_image ,add_unit} = props

  const selectUnit = [];
  let isRecipe = id % 2 == 0;
  const element = isRecipe ? <View style={styles.popUpcontainer}>
    <Text style={styles.popUpTitle}>Ingrediants of recipe:</Text>
    {Ingrediants && Ingrediants.map(x => <Text style={styles.popUpText} key={x.id}>{x.amount} {x.unitName}: {x.name}</Text>)}
    <Text style={styles.popUpTitle}>Cooking method:</Text>
    <Text style={styles.popUpText}>{cookingMethod}</Text>

  </View>
    : <></>;

  const editElement = <View style={styles.popUpcontainer}>
    <TouchableOpacity style={{ marginTop: '2%' }} onPress={()=>{setShowEdit(false); add_unit(id);}}><Text style={styles.editText('#FFCF84')}>add unit</Text></TouchableOpacity>
    <TouchableOpacity style={{ marginTop: '2%' }} on onPress={()=>{setShowEdit(false); update_image(id);}}><Text style={styles.editText('#FFC052')}>{image ? 'change' : 'add'} image</Text></TouchableOpacity>
    <TouchableOpacity style={{ marginTop: '2%' }} onPress={() => { delete_food(); }}><Text style={styles.editText('#F9AC27')}>delete {isRecipe ? 'recipe' : 'ingredient'}</Text></TouchableOpacity>
    <TouchableOpacity style={{ marginTop: '2%' }} onPress={() => { setShowEdit(false) }}><Text style={styles.editText('#F79719')}>cancel</Text></TouchableOpacity>
  </View>

  const { userDetails } = useContext(UserContext);

  const [unit, setUnit] = useState();
  const [favorite, setFavorite] = useState(isFavorit);
  const [carbs, setCrabs] = useState();
  const [suger, setSuger] = useState();
  const [amount, setAmount] = useState();
  const [weightInGrams, setWeightInGrams] = useState();
  const [showCooking, setShowCooking] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

    //every render of food
    useEffect(() => {
      UnitOfMeasure.map(x => selectUnit.push(
        {
          itemKey: x.id,
          label: x.name,
          value: x.name
        }))
    });

  const delete_food = () => {
    fetch(apiUrl + `Food/${isRecipe ? 'deleteRecipe' : 'deleteIngredient'}/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'appliction/json; charset=UTF-8',
        'Accept': 'appliction/json; charset=UTF-8'
      })
    }).then(res => {
      if (res && res.status == 200) {
     
        return res.json();
        
      } else {
        console.log("status code:", res.status)
        throw new error()
      }
    }).then((resulte) => {
      console.log('deleteRes=>', resulte);
      setShowEdit(false);
      get_all_food();
    },
      (error) => {
        console.log("error", error)
        setShowEdit(false);
        setAlert(
          <Alert text="sorry,somthing went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={100}
          />);
      })
  }



  const setFavoritDB = (method) => {

    let favorit = {
      user_id: userDetails.id,
      Rcipe_id: isRecipe ? id : null,
      Ingredient_id: isRecipe ? null : id
    }

    const configurationObject = {
      url: apiUrl + `Food/${method == 'POST' ? 'addFavorites' : 'deleteFavorites'}`,
      method: method,
      data: favorit
    };

    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("secuss");
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    if (amount && unit) {
      calcDetails(amount, unit)
    } else {
      setCrabs(0)
      setSuger(0)
      setWeightInGrams(0)
    }
  }, [unit, amount]);



  const calcDetails = (amount, unit) => {

    //clac carbs when user select Unit Of Measure
    let temp = UnitOfMeasure.find(x => x.name == unit)
    let carbs = unit == "grams" ? temp.carbs * parseFloat(amount / 100) : temp.carbs * amount
    let suger = unit == "grams" ? temp.suger * parseFloat(amount / 100) : temp.suger * amount
    let weightInGrams = unit == "grams" ? amount : temp.weightInGrams * amount

    //if there is a unit for food
    carbs && setCrabs(carbs.toFixed(1))
    suger != 0 && setSuger(suger.toFixed(1))
    temp && setWeightInGrams(weightInGrams)
  }

  return (
    <View style={styles.container} id={id}>
      <View style={styles.face}>
        {!forRecipe&&userDetails && addByUserId == userDetails.id && <TouchableOpacity style={styles.edit} onPress={() => setShowEdit(true)}>
          <Entypo name="dots-three-vertical" size={20} style={styles.Icon} />
        </TouchableOpacity>}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.frontTitle}>{name}
          </Text>
          {forRecipe ? <></> :
            favorite ?
              <TouchableOpacity onPress={() => { setFavoritDB("DELETE"); setFavorite(false) }}><Ionicons style={styles.icon} name="heart-sharp" size={24} color="#FF3C3C" /></TouchableOpacity> :
              <TouchableOpacity onPress={() => { setFavoritDB("POST"); setFavorite(true) }}><Ionicons style={styles.icon} name="heart-outline" size={24} color="black" /></TouchableOpacity>
          }
        </View>

        <View style={styles.row}>
          <Image style={styles.image} source={{ uri: image ? image.includes("http")?image:ImageUri +image : ImageUri + 'emptyFoodPhoto.JPG' }} />
          <View style={styles.details}>
            <Text style={styles.textFront}>{suger ? suger : UnitOfMeasure[0].suger.toFixed(1)} suger </Text>
            <Text style={styles.textFront} >{carbs ? carbs : UnitOfMeasure[0].carbs.toFixed(1)} Carbohydrates  </Text>
            <Text style={styles.textFront}>{weightInGrams ? weightInGrams : UnitOfMeasure[0].weightInGrams} g </Text>
          </View>
        </View>
        <View style={styles.faceFooter}>
          <Input
            placeholder={UnitOfMeasure[0].name}
            height={50}
            width={isRecipe ? 90 : 100}
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
          {isRecipe &&
            <View style={styles.cookingMethod}>
              <Button
                width={2}
                height={2}
                radius={5}
                alignItems='center'
                justifyContent='center'
                text='cooking method'
                textSize={12}
                onPress={() => { setShowCooking(true) }}
              />
            </View>}
          <View style={styles.add}>
            <Button
              width={25}
              height={3}
              radius={5}
              text='add'
              textSize={12}
              onPress={() => { addToMyListFood({ id: id, name: name, carbs: carbs, suger: suger, grams: weightInGrams, amount: amount, unit: unit, add: true }) }}
            />
          </View>
        </View>
      </View>
      <PopUp
        show={showCooking}
        setShow={(val) => setShowCooking(val)}
        backgroundColor='#d6f2fc'
        width={95}
        height={60}
        element={element}
      />
      <PopUp
        show={showEdit}
        setShow={(val) => setShowEdit(val)}
        animationType='fade'
        backgroundColor='#FCEBD6'
        isButton={false}
        height={23}
        width={44}
        element={editElement}
      />
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
    shadowOpacity: 50,
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
    marginTop: '5%'
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  icon: {
    textAlign: 'center',
    paddingRight: '2%'
  },
  add: {
    flexDirection: 'row',
    flex: 0.2,
    alignSelf: 'center',
    // paddingRight:'2%',
    // right:'2%'
  },
  checkBoxText: {
    textAlign: 'left',
  },
  frontTitle: {
    fontSize: 20,
    flexWrap: 'wrap',
    flexShrink: 1,
    top: '1%',
    fontWeight: 'bold',
    paddingLeft: '35%'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  faceFooter: {
    flex: 0.4,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: "#FFCF84",
    paddingLeft: '2%'
  },
  cookingMethod: {
    flex: 0.4,
    alignSelf: 'center',
  },
  popUpcontainer: {
    flex: 1
  },
  popUpTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    margin: '2%'
  },
  popUpText: {
    padding: '2%',
    fontSize: 16
  },
  Icon: {
    color: '#666666'
  },
  edit: {
    position: 'absolute',
    marginTop: '2%',
    zIndex: 100
  },
  editText: (color) => {
    return {
      textAlign: 'center',
      paddingTop: '8%',
      paddingBottom: '7%',
      fontSize: 14,
      backgroundColor: color,
      padding: '5%'
    }
  }
})
