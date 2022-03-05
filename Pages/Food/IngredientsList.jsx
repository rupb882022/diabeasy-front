import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Ingredient from './Ingredient';


export default function IngredientsList(props) {
    const json = [{ name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },

    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' }]
    let str = ''
    const list = json.map((x, i) =>
        <Ingredient key={i} name={x.name} image={x.image} index={i} />
    );

    return (
        <View style={styles.container}>
            {list}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap:'wrap',
        flexDirection:'row',
    },
})