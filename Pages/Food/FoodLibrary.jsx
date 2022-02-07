import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Input from '../../CTools/Input';
import IngredientsList from './IngredientsList';
import upiUrl from '../../Routes/Url'
export default function FoodLibrary() {
    const [isRecipes, setIsisRecipes] = useState(false);
    const [category, setCategory] = useState('');
    const [selectList, setselectList] = useState([])
    const [list, setList] = useState([])


    useEffect(() => {
        fetch(upiUrl + "Food/Category", {
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
            setselectList(resulte);
        },
            (error) => {
                console.log("error", error)
            })
    }, []);

    useEffect(() => {
        // set the opption for select category
        if (list.length == 0) {
            let temp = selectList.map(x => ({ itemKey: x.id, label: x.name, value: x.name }))
            setList(temp);
        }
        (list)
    }, [selectList]);

    return (

        <View style={styles.continer}>
            <View style={styles.input}>
                <Input
                    label='category'
                    editable={false}
                    getValue={(value) => setCategory(value)}
                    type='selectBox'
                    SelectBox_placeholder='Select category'
                    selectBox_items={list} />
                <Text style={styles.text}>ingredients</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={isRecipes ? '#ff650d' : "#3CA6CD"}
                    ios_backgroundColor='#ff9000'
                    onValueChange={() => { setIsisRecipes(!isRecipes) }}
                    value={isRecipes}
                />
                <Text style={styles.text}>recipes</Text>
            </View>
            <View style={styles.cards}>
                {category ?
                    isRecipes ?
                        <></> :
                        <IngredientsList />
                    : <></>
                }
            </View>
        </View >

    );
}
const styles = StyleSheet.create({
    continer: {
        flex: 1,
        width: '110%',
        height: '100%',
        paddingRight: '2%',
        paddingLeft: '2%'
    },
    input: {
        marginTop: '2%',
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'baseline',
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
        flex: 1
    }
})