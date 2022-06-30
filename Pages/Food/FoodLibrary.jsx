import { View, Text, StyleSheet, Switch, TouchableOpacity,Animated ,Easing} from 'react-native';
import React, { useState, useEffect, useContext,useRef } from 'react';
import Input from '../../CTools/Input';
import FoodList from './FoodList';
import apiUrl from '../../Routes/Url'
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading'
import Button from '../../CTools/Button';
import { UserContext } from '../../CTools/UserDetailsHook'
import { useFocusEffect } from '@react-navigation/native';
import Alert from '../../CTools/Alert';
import SelectedList from './SelectedList';
import { AntDesign } from '@expo/vector-icons';
import { Get_all_food, Get_all_categories, Serch_food } from '../../Functions/Function'

export default function FoodLibrary({ navigation }) {

    const { userDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState();
    const [isRecipes, setIsisRecipes] = useState(false);
    const [favoritId, setFavoritId] = useState(4);
    const [serchByName, setSerchByName] = useState();//the chosen name of food for serch
    const [category, setCategory] = useState(0);//the chosen category
    const [list, setList] = useState();//category list
    const [foodList, setFoodList] = useState([]);//food cards list
    const [ingredient, setIngredient] = useState([]);//all ingredient from DB
    const [recipes, setRecipes] = useState([]);//all recipes from DB
    const [myFoodList, setMyFoodList] = useState([]);//the chosen food list
    const [myFoodDtails, setmyFoodDtails] = useState({ carbs: 0.0, suger: 0.0 });//the details on chosen food list

    let fadeAnim = useRef(new Animated.Value(0)).current;


    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.back(),
        useNativeDriver: true 
      }).start();
      
    };

    useFocusEffect(
        React.useCallback(() => {
            if(foodList){
            fadeIn();
            }
        },[foodList]))

    //get all Food 
    useFocusEffect(
        React.useCallback(() => {
            get_all_food()
        }, [isRecipes]));

    const get_all_food = () => {
        foodList && setFoodList([]);
        Get_all_food(userDetails ? userDetails.id : 0, isRecipes ? 'getRecipes' : 'getIngredients').then((resulte) => {
            isRecipes ? setRecipes(resulte) : setIngredient(resulte);
            setFoodList(resulte);
          
        },
            (error) => {
                setAlert(
                    <Alert text='sorry something went wrong, try again later'
                        type='worng'
                        bottom={50}
                    />)
                console.log("error in function Get_all_food", error)
                setLoading(false)
            })
    }

    //get all Categories 
    useEffect(() => {
        if (!list) {
            Get_all_categories().then((resulte) => {
                let temp = resulte.map(x => {
                    x.name == "Favorites" && setFavoritId(x.id);
                    return ({ itemKey: x.id, label: x.name.replace(/(\r\n|\n|\r)/gm, ""), value: x.id })
                });
                setList(temp);
            },
                (error) => {
                    console.log("error in function Get_all_categories ", error)
                })
        }
    }, []);



    //render the ingredient by category
    const category_filter = () => {

        if (ingredient && !isRecipes) {
            //fillter by category
            let List = ingredient.filter(x =>
                x.category.length < 1 ?
                    x.category[0].id == category :
                    x.category.find(z => z.id == category)
            );
            setFoodList(List);
        }
        if (recipes && isRecipes) {
            //fillter by category
            let List = recipes.filter(x =>
                x.category.length < 1 ?
                    x.category[0].id == category :
                    x.category.find(z => z.id == category)
            );
            setFoodList(List);
        }
    }

    useEffect(() => {

        if (category == favoritId) {//if category set to favorit
            get_all_food()

        }
        if (!category && (ingredient.length > 0 && !isRecipes) || (recipes && isRecipes)) {// defualt show all food
            isRecipes ? setFoodList(recipes) : setFoodList(ingredient)
        }
        else {
            category_filter();
        }
    }, [category]);

    //render favorits after get all food from db
    useEffect(() => {
        if (category == favoritId) {
            category_filter();
        }
    }, [recipes, ingredient]);

    const Serch_food_by_name = () => {
        if (serchByName) {
            setLoading(true)
            Serch_food(serchByName, userDetails&&userDetails.id ? userDetails.id : 0, isRecipes ? 'getRecipes' : 'getIngredients').then((resulte) => {
                if (!resulte || resulte.length < 0 || resulte[0].id == 0) {
                    setAlert(<Alert text='sorry we cannot find your food search'
                        type='worng'
                        time={3500}
                        bottom={350}
                    />)
                } else {
                    setFoodList(resulte)
                }
                setLoading(false)
            },
                (error) => {
                    setAlert(
                        <Alert text='sorry we cannot find your food search'
                            type='worng'
                            bottom={50}
                        />)
                    console.log("error in function Serch_food", error)
                    setLoading(false)
                })
        } else {
            setAlert(
                <Alert text='cannot serch with empty value'
                    type='alert'
                    bottom={50}
                />)
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
                    setAlert(<Alert text={isRecipes ? 'Recipe is allready in your list' : 'Ingredient is allready in your list'}
                        type='alert'
                        time={3000}
                        bottom={50} />)
                    return;
                } else {
                    temp = myFoodList;
                    temp.push(food);
                    setAlert(
                        <Alert text={isRecipes ? 'Recipe add to list' : 'Ingredient add to list'}
                            type='success'
                            bottom={50}
                        />)
                }
            } else {
                setAlert(<Alert text={'select unit and amount to add food item'}
                    type='alert'
                    time={3000}
                    bottom={50} />)
                return;
            }
        }//if food item was delete 
        else {
            temp = myFoodList.filter(x => x.id != food.id)
        }
        setMyFoodList(temp);
        calc_myFoodDtails(temp);
    }
    const update_image = (id) => {
        navigation.navigate('CameraUse', { imageName: id % 2 == 0 ? `recipe${id}` : `Ingredient${id}` })
    }
    const add_unit = (id) => {
        navigation.navigate('AddUnit', { foodId: id })
    }

    return (<>
        {loading && <Loading opacity={'#d6f2fc'} />}
        <Header
            title={isRecipes ? 'Recipe' : 'Ingredient'}
            flex={1.35}
            // marginLeft={isRecipes ? -1 : 5}
            // paddingRight={5}
            possiton={27}
        />
        <View style={styles.continer}>

            <View style={styles.input_category}>
                <Input
                    placeholder='Category'
                    editable={false}
                    getValue={(value) => { setFoodList([]); setCategory(value); }}
                    type='selectBox'
                    height={65}
                    width={isRecipes ? 80 : 90}
                    alignItems='flex-start'
                    SelectBox_placeholder='Select category'
                    selectBox_items={list} />
                <Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={isRecipes ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setIsisRecipes(!isRecipes) }}
                    value={isRecipes}
                />
                <Text style={styles.text}>{isRecipes ? 'recipes' : 'ingredients'}</Text>
            </View>
            <View style={styles.input_freeText}>
                <Input
                    placeholder='search...'
                    height={65}
                    flex={0.3}
                    width={205}
                    alignItems='flex-start'
                    getValue={(value) => setSerchByName(value)}
                />
                <View style={{ flexDirection: 'row', flex: 1, paddingTop: '2.1%', paddingRight: '3%' }}>
                    <View style={{ flex: 1, paddingLeft: '35%' }}>
                        <Button
                            width={6}
                            height={6}
                            radius={5}
                            textSize={14}
                            element={<AntDesign name="search1" size={16} color="white" />}
                            alignItems='flex-start'
                            onPress={() => { Serch_food_by_name() }}
                        />
                    </View>
                    <Button
                        textSize={9}
                        width={14}
                        height={4}
                        radius={50}
                        element={<Text style={{ color: 'white' }}>Add new</Text>}
                        alignItems='flex-start'
                        onPress={() => navigation.navigate('AddNewFood', { categoryList: list, isRecipes: isRecipes, userId: userDetails.id, foodList: ingredient })}
                    />
                </View>
            </View>
            <Animated.View style={styles.cards(fadeAnim)}>
                {foodList && foodList.length > 0 &&
                    <FoodList
                        get_all_food={() => { get_all_food() }}
                        foodList={foodList}
                        setAlert={(value) => { setAlert(value) }}
                        addToMyListFood={(value) => { addToMyListFood(value) }}
                        add_unit={(value) => { add_unit(value) }}
                        update_image={(value) => { update_image(value) }}
                    />
                }
            </Animated.View>
            <View style={styles.showlist}>
                <Button
                    text='my food list'
                    height={2}
                    width={8}
                    justifyContent='center'
                    alignItems='flex-end'
                    onPress={() => setShow(true)}
                />
                <View style={{ flex: 1, paddingRight: '5%', }}>
                    <Button
                        text='save'
                        height={2}
                        width={22}
                        alignItems='center'
                        justifyContent='flex-end'
                        onPress={() => { navigation.navigate('Insert Data', { myFoodDtails: myFoodList ? myFoodList : '' }); }}//to delete values on save=> setmyFoodDtails([]);setMyFoodList([])
                    />
                </View>
            </View>
        </View>
        {show && <SelectedList
            setShow={setShow}
            show={show}
            myFoodList={myFoodList}
            myFoodDtails={myFoodDtails}
            addToMyListFood={addToMyListFood}
        />}
        {alert && alert}
    </>);
}
const styles = StyleSheet.create({
    continer: {
        flex: 12,
        // bottom: '1%'
        top:'1%'
    },
    input_category: {
        paddingLeft: '5%',
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        bottom: '8%'
    },
    input_freeText: {
        paddingLeft: '5%',
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        bottom: '6%'
    },
    switch: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: '2%',
    },
    text: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: "2%"
    },
    cards:(fadeAnim)=> {
      return{  flex: 2,
        bottom: '2%',
        opacity: fadeAnim
    }
    },
    showlist: {
        flex: 0.2,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom:'3%'

    },
})