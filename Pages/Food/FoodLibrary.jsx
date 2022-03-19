import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../CTools/Input';
import IngredientsList from './IngredientsList';
import apiUrl from '../../Routes/Url'
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading'
import Button from '../../CTools/Button';
import { UserContext } from '../../CTools/UserDetailsHook'
import { useFocusEffect } from '@react-navigation/native';
import PopUp from '../../CTools/PopUp';
import Alert from '../../CTools/Alert';


export default function FoodLibrary({ navigation }) {

    const { userDetails } = useContext(UserContext);
    //Todo serch by food name
    const [isRecipes, setIsisRecipes] = useState(false);
    const [category, setCategory] = useState('');
    const [list, setList] = useState();
    const [foodList, setFoodList] = useState();
    const [ingredient, setIngredient] = useState();
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [myFoodList, setMyFoodList] = useState([]);
    const [myFoodDtails, setmyFoodDtails] = useState({ carbs: 0.0, suger: 0.0 });
    const [alert, setAlert] = useState();

    //get all Ingredients 
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true)
            fetch(apiUrl + `Food/getIngredients`, {
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
                setIngredient(resulte)
                setLoading(false)
            },
                (error) => {
                    console.log("error", error)
                    setLoading(false)
                })
        }, [])
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
                }
            }).then((resulte) => {
                let temp = resulte.map(x => ({ itemKey: x.id, label: x.name, value: x.id }))
                setList(temp);
            },
                (error) => {
                    console.log("error", error)
                })
        }
    }, []);
    //render the ingredient by category
    useEffect(() => {
        if (ingredient) {
            //fillter by category
            let List = ingredient.filter(x =>
                x.category.length < 1 ?
                    x.category[0].id == category :
                    x.category.find(z => z.id == category)
            );
            setFoodList(List);
        }
    }, [category]);

    //insert food to my list
    const addToMyListFood = (food) => {
        console.log("foodJson", food);
        let temp
        let tempDetails = myFoodDtails
        let carbs = parseFloat(tempDetails.carbs)
        let suger =parseFloat(tempDetails.suger)


        //check if food need to add or delete
        if (food.add) {
            console.log("carbs type1=>",typeof(carbs));
            //cheak if user fill in unit and amount
            if (food.suger != 0 || food.carbs != 0) {

                //check if item is allready in the list
                if (myFoodList.find(x => x.id == food.id)) {
                    setAlert(<Alert text={isRecipes ? 'Recipe' : 'Ingredient' + 'is allready in your list'}
                        type='alert'
                        time={3000}
                        bottom={50} />)
                    return;
                }
                setAlert(
                    <Alert text={isRecipes ? 'Recipe' : 'Ingredient' + ' add to list'}
                        type='success'
                        bottom={50}
                    />)

            } else {
                setAlert(<Alert text={'select unit and amount to add food item'}
                    type='alert'
                    time={3000}
                    bottom={50} />)
                return;
            }
            temp = myFoodList;
            temp.push(food);
            carbs += parseFloat(food.carbs)
             suger += parseFloat(food.suger) 
        }//if food item was delete 
        else {
            temp = myFoodList.filter(x => x.id != food.id)
            console.log("temp",temp);
            console.log("food.carbs type=>",typeof(food.carbs));
            console.log("food.carbs=>", food.carbs);
            console.log("carbs",carbs);
            carbs = (carbs - food.carbs)
            food.suger != 0 ? suger -= food.suger : suger;
            console.log("carbs type=>",typeof(carbs));
        }
        setmyFoodDtails({ carbs: carbs, suger: suger })
        setMyFoodList(temp);
    }
    console.log("myFoodDtails", myFoodDtails);
    const ListElement = myFoodList.length > 0 ? <>{myFoodList.map((x, i) => <View key={i} style={{ alignSelf: 'flex-start' }}>
        <View style={styles.listRow}>
            <TouchableOpacity onPress={() => { addToMyListFood({ id: x.id, name: x.name, carbs: x.carbs, suger: x.suger, add: false }) }}
            ><Text style={styles.exit}> X</Text></TouchableOpacity>
            <Text style={styles.mylistvar}>{x.name}</Text>
            <Text style={styles.mylist}> Carbohydrates:</Text><Text style={styles.mylistvar}>{x.carbs}</Text>
            <Text style={styles.mylist}> Suger:</Text><Text style={styles.mylistvar}>{x.suger}</Text>
        </View>
    </View>)}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text>Total Carbohydrates: {myFoodDtails.carbs} Suger: {myFoodDtails.suger}</Text>
        </View></>
        : <View style={{ flex: 1 }}><Text>list is empty</Text></View>;

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
                />
                <View style={{ flexDirection: 'row', flex: 1, paddingTop: '1.5%', paddingRight: '5%' }}>
                    <Button
                        width={8}
                        height={5}
                        radius={5}
                        textSize={14}
                        text='Serch'
                        alignItems='flex-start'
                    />
                    <View style={{ flex: 1, right: '40%' }}>
                        <Button
                            textSize={14}
                            width={7}
                            height={5}
                            radius={5}
                            text='Add new'
                            alignItems='flex-start'
                            onPress={() => navigation.navigate('AddNewFood', { categoryList: list, isRecipes: isRecipes, userId: userDetails.id })}
                        />

                    </View>
                    {/* <Text style={{alignSelf:'center',left:'20%',textAlign:'right'}}>
                        {isRecipes?'recipe':'ingredient'}</Text> */}
                </View>
            </View>
            <View style={styles.cards}>
                {category ?
                    isRecipes ?
                        <></> :
                        <IngredientsList
                            foodList={foodList}
                            addToMyListFood={(value) => { addToMyListFood(value) }}
                        />
                    : <></>
                }
            </View>
            <PopUp
                show={show}
                setShow={setShow}
                backgroundColor='#d6f2fc'
                width={95}
                height={60}
                element={ListElement}
            />
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
    mylist: {
        paddingLeft: '2%',
        fontSize: 15
    },
    mylistvar: {
        fontWeight: 'bold',
        fontSize: 15
    },
    exit: {
        textAlign: 'right',
        paddingRight: '2%',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    }, listRow: {
        flexDirection: 'row',
        paddingTop: '5%',
        paddingBottom: '2%',
        width: 300,
        borderBottomWidth: 1,
        borderRadius: 10,
        flexWrap: 'wrap'
    }
})