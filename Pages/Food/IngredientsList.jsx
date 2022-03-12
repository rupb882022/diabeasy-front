import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ingredient from './Ingredient';

export default function IngredientsList(props) {
    const { foodList } = props


    const list = foodList ? foodList.map((x, i) =>
        <Ingredient
            key={i}
            id={x.id}
            name={x.name}
            image={x.image}
            UnitOfMeasure={x.UnitOfMeasure}
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