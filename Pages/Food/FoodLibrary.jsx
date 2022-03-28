import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../CTools/Input';
import FoodList from './FoodList';
import apiUrl from '../../Routes/Url'
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading'
import Button from '../../CTools/Button';
import { UserContext } from '../../CTools/UserDetailsHook'
import { useFocusEffect } from '@react-navigation/native';
import PopUp from '../../CTools/PopUp';
import Alert from '../../CTools/Alert';
import SelectedList from './SelectedList';


export default function FoodLibrary({ navigation }) {

    const { userDetails } = useContext(UserContext);
    //todo clean input of serch after click or serch by category and food name
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState();

    const [isRecipes, setIsisRecipes] = useState(false);

    const [serchByName, setSerchByName] = useState();//the chosen name of food for serch
    const [category, setCategory] = useState('');//the chosen category
    const [list, setList] = useState();//category list
    const [foodList, setFoodList] = useState();//food cards list
    const [ingredient, setIngredient] = useState();//all ingredient from DB
    const [recipes, setRecipes] = useState();//all recipes from DB
    const [myFoodList, setMyFoodList] = useState([]);//the chosen food list
    const [myFoodDtails, setmyFoodDtails] = useState({ carbs: 0.0, suger: 0.0 });//the details on chosen food list

    //get all Ingredients 
    useFocusEffect(
        React.useCallback(() => {
            setFoodList([]);
            if (isRecipes) {
                console.log(apiUrl + `Food/getRecipes/all/${userDetails ? userDetails.id : 0}`);
                setLoading(true)
                fetch(apiUrl + `Food/getRecipes/all/${userDetails ? userDetails.id : 0}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'appliction/json; charset=UTF-8',
                        'Accept': 'appliction/json; charset=UTF-8'
                    })
                }).then(res => {
                    if (res && res.status == 200) {
                        return res.json();
                    } else {

                        console.log("status code:", res.status)
                        throw new error(res.body)
                    }
                }).then((resulte) => {
                    setRecipes(resulte)
                    setFoodList(resulte)
                    setLoading(false)
                },
                    (error) => {
                        setAlert(
                            <Alert text='sorry somting is not working try agine later'
                                type='worng'
                                bottom={50}
                            />)
                        console.log("error", error)
                        setLoading(false)
                    })
            } else {
                console.log(apiUrl + `Food/getIngredients/all/${userDetails ? userDetails.id : 0}`);
                setLoading(true)
                fetch(apiUrl + `Food/getIngredients/all/${userDetails ? userDetails.id : 0}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'appliction/json; charset=UTF-8',
                        'Accept': 'appliction/json; charset=UTF-8'
                    })
                }).then(res => {
                    if (res && res.status == 200) {
                        return res.json();
                    } else {

                        console.log("status code:", res.status)
                        throw new error(res.body)
                    }
                }).then((resulte) => {
                    setIngredient(resulte)
                    setFoodList(resulte)
                    setLoading(false)
                },
                    (error) => {
                        setAlert(
                            <Alert text='sorry somting is not working try agine later'
                                type='worng'
                                bottom={50}
                            />)
                        console.log("error", error)
                        setLoading(false)
                    })
            }
        }, [isRecipes])
    );
    //get all Categories 
    useEffect(() => {
        if (!list) {
            fetch(apiUrl + "Food/Category", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'appliction/json; charset=UTF-8',
                    'Accept': 'appliction/json; charset=UTF-8'
                })
            }).then(res => {
                if (res && res.status == 200) {
                    return res.json();
                } else {
                    console.log("status code:", res.status)
                    throw new error(res.body)
                }
            }).then((resulte) => {
                let temp = resulte.map(x => ({ itemKey: x.id, label: x.name.replace(/(\r\n|\n|\r)/gm, ""), value: x.id }))
                setList(temp);
            },
                (error) => {
                    console.log("error", error)
                })
        }
    }, []);

    //render the ingredient by category
    useEffect(() => {
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
    }, [category]);

    const Serch_food_by_name = () => {
        if (serchByName) {
            setLoading(true)
            fetch(apiUrl + `Food/getIngredients/${serchByName}/${userDetails ? userDetails.id : 0}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'appliction/json; charset=UTF-8',
                    'Accept': 'appliction/json; charset=UTF-8'
                })
            }).then(res => {
                if (res && res.status == 200) {
                    return res.json();
                } else {
                    console.log("status code:", res.status)
                }
            }).then((resulte) => {
                setFoodList(resulte)
                setLoading(false)
            },
                (error) => {
                    setAlert(
                        <Alert text='sorry somting is not working try agine later'
                            type='worng'
                            bottom={50}
                        />)
                    console.log("error", error)
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
        console.log("list", list);
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

    return (<>
        {loading && <Loading opacity={'#d6f2fc'} />}

        <View style={styles.continer}>
            <Header
                title={isRecipes ? 'Recipe' : 'Ingredient'}
                flex={0.4}
                marginLeft={isRecipes ? 0 : 7}
                paddingRight={5}
                possiton={45}
            />
            <View style={styles.input_category}>
                <Input
                    label='Category'
                    editable={false}
                    getValue={(value) => { setFoodList([]); setCategory(value); }}
                    type='selectBox'
                    height={50}
                    SelectBox_placeholder='Select category'
                    selectBox_items={list} />
                <Text style={styles.text}>ingredients</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={isRecipes ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setIsisRecipes(!isRecipes) }}
                    value={isRecipes}
                />
                <Text style={styles.text}>recipes</Text>
            </View>
            <View style={styles.input_freeText}>
                <Input
                    placeholder='food name'
                    height={50}
                    flex={1}
                    getValue={(value) => setSerchByName(value)}
                />
                <View style={{ flexDirection: 'row', flex: 1, paddingTop: '1.5%', paddingRight: '5%' }}>
                    <Button
                        width={8}
                        height={5}
                        radius={5}
                        textSize={14}
                        text='Serch'
                        alignItems='flex-start'
                        onPress={Serch_food_by_name}
                    />
                    <View style={{ flex: 1, right: '40%' }}>
                        <Button
                            textSize={14}
                            width={7}
                            height={5}
                            radius={5}
                            text='Add new'
                            alignItems='flex-start'
                            onPress={() => navigation.navigate('AddNewFood', { categoryList: list, isRecipes: isRecipes, userId: userDetails.id, foodList: ingredient })}
                        />

                    </View>
                    {/* <Text style={{alignSelf:'center',left:'20%',textAlign:'right'}}>
                        {isRecipes?'recipe':'ingredient'}</Text> */}
                </View>
            </View>
            <View style={styles.cards}>
                {foodList &&
                    <FoodList
                        foodList={foodList}
                        addToMyListFood={(value) => { addToMyListFood(value) }}
                    />
                }
            </View>
            {/* <PopUp
                show={show}
                setShow={setShow}
                backgroundColor='#d6f2fc'
                width={95}
                height={60}
                element={ListElement}
            /> */}
            <View style={styles.showlist}>
                <Button
                    text='my food list'
                    height={2}
                    width={8}
                    justifyContent='center'
                    onPress={() => setShow(true)}
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
        {alert && alert}
    </>);
}
const styles = StyleSheet.create({
    continer: {
        flex: 10,
    },
    input_category: {
        marginRight: '2%',
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        bottom: '6%'
    },
    input_freeText: {
        marginRight: '2%',
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
    cards: {
        flex: 2,
    },
    showlist: {
        flex: 0.3,
        alignItems: 'center'
    },
})