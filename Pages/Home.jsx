import { View, Text, StyleSheet,Image } from 'react-native';
import React from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';

export default function Home() {
    return (
        <View style={styles.container}>
            <Header
            title='Diabeasy'
            />
            <Button
                btntext='Insert Data'
                justifyContent='flex-end'
                radios={1000}
                withe={10}
                heigth={24}
                textSize={30}
                alignItems='center'
            />
            
             {/* user name */}
            <Text style={styles.textHwllo}>Hello Itzik</Text>
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
        justifyContent:'center',
        // alignItems:'center',
    },
    textHwllo:{
        color:'#1ea6d6',
        alignSelf:'flex-start',
        fontSize:32,
        paddingLeft:'5%',
        paddingBottom:'5%',
        paddingTop:'15%' ,
        fontWeight:'bold' ,
    },
    Image:{
height:'25%',
resizeMode:'cover',
width:'40%',
alignSelf:'flex-end',
opacity:0.95
    }
});