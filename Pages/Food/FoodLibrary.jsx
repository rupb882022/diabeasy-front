import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import Input from '../../CTools/Input';
import IngredientsList from './IngredientsList';
import upiUrl from '../../Routes/Url'
import Header from '../../CTools/Header';
export default function FoodLibrary() {
    const [isRecipes, setIsisRecipes] = useState(false);
    const [category, setCategory] = useState('');
    const [list, setList] = useState();
    const [foodList, setFoodList] = useState();


    const ingredientsList = [
        {
            "id": 1,
            "name": "Bamba",
            "image": "https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg",
            "category": ["Snacks"],
            "UnitOfMeasure": [
                { "id": 4, "name": "Unit", "image": null, "carbs": 31.6, "suger": 0.0, "weightInGrams": 80.0 },
                { "id": 5, "name": "grams", "image": null, "carbs": 39.5, "suger": 0.0, "weightInGrams": 100.0 }
            ]
        },
        { "id": 4, "name": "Chips", "image": "https://m.media-amazon.com/images/I/81vJyb43URL.jpg", "category": ["Snacks"], "UnitOfMeasure": [{ "id": 4, "name": "Unit", "image": null, "carbs": 26.5, "suger": 0.0, "weightInGrams": 50.0 }, { "id": 5, "name": "grams", "image": null, "carbs": 53.0, "suger": 0.0, "weightInGrams": 100.0 }] }, { "id": 5, "name": "Bamba Nougat", "image": "http://cdn.shopify.com/s/files/1/1660/0153/products/Osem_Bamba_With_Hazelnut_Filling_grande.jpg?v=1496517705", "category": ["Snacks"], "UnitOfMeasure": [{ "id": 4, "name": "Unit", "image": null, "carbs": 34.2, "suger": 3.9, "weightInGrams": 60.0 }, { "id": 5, "name": "grams", "image": null, "carbs": 57.0, "suger": 6.5, "weightInGrams": 100.0 }] }, { "id": 6, "name": "Rice", "image": "https://media.istockphoto.com/photos/rice-in-a-bowl-on-a-white-background-picture-id860931464?k=20&m=860931464&s=612x612&w=0&h=Q5ADqpZbQbVzm3YkNwbyhn023S64em9w08O0xg0b0KE=", "category": ["Lunch", "Dinner", "Grains&Cereals\r\n"], "UnitOfMeasure": [{ "id": 1, "name": "Small-cup", "image": null, "carbs": 28.1, "suger": 20.0, "weightInGrams": 100.0 }, { "id": 5, "name": "grams", "image": null, "carbs": 28.1, "suger": 0.0, "weightInGrams": 100.0 }] }, { "id": 7, "name": "ptitim", "image": "https://preprod.shook360.com/wp-content/uploads/2021/01/7290000060576-300x300.jpg", "category": ["Lunch", "Dinner", "Grains&Cereals\r\n"], "UnitOfMeasure": [{ "id": 5, "name": "grams", "image": null, "carbs": 25.7, "suger": 0.0, "weightInGrams": 100.0 }] }, { "id": 8, "name": "Apple", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/640px-Red_Apple.jpg", "category": ["Fruits\r\n"], "UnitOfMeasure": [{ "id": 4, "name": "Unit", "image": null, "carbs": 28.0, "suger": 20.0, "weightInGrams": 200.0 }, { "id": 5, "name": "grams", "image": null, "carbs": 14.0, "suger": 10.0, "weightInGrams": 100.0 }] }]

    useEffect(() => {
        if (!list) {
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
                console.log("resulte", resulte);
                let temp = resulte.map(x => ({ itemKey: x.id, label: x.name, value: x.name }))
                setList(temp);
            },
                (error) => {
                    console.log("error", error)
                })
        }
    }, []);

    useEffect(() => {
        //fillter by category
        let List = ingredientsList.filter(x =>
            x.category.length < 1 ?
                x.category[0] == category :
                x.category.find(z => z == category)
        );
        setFoodList(List);
    }, [category]);

    return (<>
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
            <View style={styles.input}>
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
    input: {
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
        flex: 2
    }
})