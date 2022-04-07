import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Food from './Food';


export default function FoodList(props) {
    const { foodList,addToMyListFood,forRecipe=false,setAlert,get_all_food,add_unit,update_image} = props

    const list = foodList ? foodList.map((x, i) =>
        x.id!=0&&<Food
            key={i}
            id={x.id}
            addByUserId={x.addByUserId}
            name={x.name}
            setAlert={(value)=>{setAlert(value)}}
            isFavorit={x.favorit}
            image={x.image}
            UnitOfMeasure={x.UnitOfMeasure}
            addToMyListFood={(value)=>{addToMyListFood(value)}}
            forRecipe={forRecipe}
            cookingMethod={x.cookingMethod&&x.cookingMethod}
            Ingrediants={x.Ingrediants&&x.Ingrediants}
            get_all_food={get_all_food}
            add_unit={(value)=>{add_unit(value)}}
            update_image={(value)=>{update_image(value)}}
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
        paddingTop:'1%'
    },
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
    },
})