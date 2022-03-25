import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Food from './Food';

export default function FoodList(props) {
    const { foodList,addToMyListFood,forRecipe=false} = props


    const list = foodList ? foodList.map((x, i) =>
        <Food
            key={i}
            id={x.id}
            name={x.name}
            image={x.image}
            UnitOfMeasure={x.UnitOfMeasure}
            addToMyListFood={(value)=>{addToMyListFood(value)}}
            forRecipe={forRecipe}
            cookingMethod={x.cookingMethod&&x.cookingMethod}
            Ingrediants={x.Ingrediants&&x.Ingrediants}
        />
    ) : <></>

    return (
        <ScrollView style={styles.container}>
            <View style={styles.viewContainer}>
                {list}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingLeft: 15,
        paddingRight: 15,
    },
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
    },
})