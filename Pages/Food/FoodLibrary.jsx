import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState, useEffect,useContext } from 'react';
import Input from '../../CTools/Input';
import IngredientsList from './IngredientsList';
import apiUrl from '../../Routes/Url'
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading'
import Button from '../../CTools/Button';
import { UserContext } from '../../CTools/UserDetailsHook'

export default function FoodLibrary({navigation}) {

    const { userDetails } = useContext(UserContext);
//Todo serch by food name
    const [isRecipes, setIsisRecipes] = useState(false);
    const [category, setCategory] = useState('');
    const [list, setList] = useState();
    const [foodList, setFoodList] = useState();
    const [ingredient, setIngredient] = useState();
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        if (!ingredient) {
            setLoading(true)
            console.log("*");
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
                console.log("resulte",resulte);
                setIngredient(resulte)
                setLoading(false)
            },
                (error) => {
                    console.log("error", error)
                    setLoading(false)
                })
        }
    }, []);


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

    return (<>
        {loading && <Loading opacity={'#d6f2fc'} />}
        <View style={styles.continer}>
            <Header
                title="Recipes"
                logo_image='recipes'
                flex={0.4}
                image_heigt={0}
                image_width={40}
                paddingRight={5}
                possiton={55}
            />
            <View style={styles.input_category}>
                <Input
                    label='Category'
                    editable={false}
                    getValue={(value) => setCategory(value)}
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
                <View style={{ flexDirection: 'row', flex: 1, paddingTop: '2.5%', paddingRight: '5%' }}>
                    <Button
                        width={8}
                        height={5}
                        radius={5}
                        textSize={14}
                        text='Serch'
                        alignItems='flex-start'
                    />
                    <View style={{flex:1,right:'40%'}}>
                        <Button
                            textSize={14}
                            width={7}
                            height={5}
                            radius={5}
                            text='Add new'
                            alignItems='flex-start'
                            onPress={()=>navigation.navigate('AddNewFood',{categoryList:list,isRecipes:isRecipes,userId:userDetails.id})}
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
                        />
                    : <></>
                }
            </View>
        </View >

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
        bottom: '8%'
    },
    input_freeText: {
        marginRight: '2%',
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        bottom: '8%'
    },
    switch: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: '2%'
    },
    text: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: "2%"
    },
    cards: {
        flex: 2,
        }
})