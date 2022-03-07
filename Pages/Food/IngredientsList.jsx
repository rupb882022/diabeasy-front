import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import React from 'react';
import Ingredient from './Ingredient';
import apiUrl from '../../Routes/Url'

export default function IngredientsList(props) {
    const json = [{ name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },

    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' },
    { name: 'Bamba', image: 'https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg' }]
 

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

    const list = json.map((x, i) =>
        <Ingredient key={i} name={x.name} image={x.image} index={i} />
    );

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
        paddingLeft:10,
        paddingRight:10,
    },
    viewContainer:{
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'space-between',
        flex: 1,
    },
})