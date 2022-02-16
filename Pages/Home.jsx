import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import upiUrl from '../Routes/Url'



export default function Home({ navigation }) {

// const test=()=>{

//     fetch(upiUrl+"values",{
//         method:'GET',
//         headers:new Headers({
//             'Content-Type':'appliction/json; charset=UTF-8',
//             'Accept':'appliction/json; charset=UTF-8'
//         })
//     }).then(res=>{
//         console.log("res",res)
//         return res.json();
//     }).then((resulte)=>{
//         alert(resulte);
//     },
//     (error)=>{
//         console.log("error",error)
//     })
// }


    return (
        <View style={styles.container}>
            <Header
                title='Home'
                logo_image='heart'
                flex={0.4}
                image_width={30}
                image_heigt={50}
                paddingRight={9}
                possiton={68}
                image_margin={{Bottom:5}}
            />
   
            <Button
                text='Insert Data'
                justifyContent='flex-end'
                radius={1000}
                width={10}
                height={24}
                textSize={30}
                alignItems='center'
                onPress={() => navigation.navigate('Insert Data')}
            />

            {/* user name */}
            <Text style={styles.textHello}>Hello Itzik</Text>
            <Image
                style={styles.Image}
                source={require('../images/home_img.webp.png')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textHello: {
        color: '#1ea6d6',
        alignSelf: 'flex-start',
        fontSize: 32,
        paddingLeft: '5%',
        paddingBottom: '5%',
        paddingTop: '15%',
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: {width:2,height:2},
        textShadowRadius: 3
    },
    Image: {
        height: '25%',
        resizeMode: 'cover',
        width: '40%',
        alignSelf: 'flex-end',
        opacity: 0.95
    }
});