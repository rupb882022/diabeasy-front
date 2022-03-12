import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ingredient from './Ingredient';
import apiUrl from '../../Routes/Url'

export default function IngredientsList(props) {
    const { foodList } = props

    const [ingredient, setIngredient] = useState();


    // fetch(apiUrl + `Food/`, {
    //     method: 'GET',
    //     headers: new Headers({
    //         'Content-Type': 'appliction/json; charset=UTF-8',
    //         'Accept': 'appliction/json; charset=UTF-8'
    //     })
    // }).then(res => {
    //     if (res && res.status == 200) {
    //         return res.json();
    //     } else {
    //         console.log("status code:", res.status)
    //     }
    // }).then((resulte) => {
    //     resulte ? setPhone(resulte) : setAlert("sorry.. we did not found your energency person, you can go to setting page to add one")

    // },
    //     (error) => {
    //         console.log("error", error)
    //     })

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
        paddingLeft: 10,
        paddingRight: 10,
    },
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
    },
})