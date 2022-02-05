import { View, Text, StyleSheet, Switch,ScrollView } from 'react-native';
import React, { useState } from 'react';
import Input from '../../CTools/Input';
import IngredientsList from './IngredientsList';

export default function FoodLibrary() {
    const [isRecipes, setIsisRecipes] = useState(false);
    const [category, setCategory] = useState('');

    return (

        <View style={styles.continer}>
            <View style={styles.input}>
                <Input
                    label='category'
                    editable={false}
                    getValue={(value) => setCategory(value)}
                    type='selectBox'
                    SelectBox_placeholder='Select category'
                    selectBox_items={[
                        { itemKey: 0, label: 'Breakfast', value: 'Breakfast' },
                        { itemKey: 1, label: 'Lunch', value: 'Lunch' },
                        { itemKey: 2, label: 'Dinner', value: 'Dinner' },
                    ]} />
                <Text style={styles.text}>ingredients</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={isRecipes ? "#2FDED2" : "#3CA6CD"}
                    ios_backgroundColor="#CDCDCD"
                    onValueChange={() => { setIsisRecipes(!isRecipes) }}
                    value={isRecipes}
                />
                <Text style={styles.text}>recipes</Text>
            </View>
            <View style={styles.cards}>
                {category?
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