import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ImageUri from './ImageUri';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CustomDrawer(props) {
    const { userDetails ,navigation} = props

     const image = userDetails.image ? <Image source={{uri:ImageUri+userDetails.image}} style={styles.image} /> :
                                      <Image source={require('../images/profile_pictur.jpeg')} style={styles.image} />

//        const [image,setImage] =useState( userDetails.image ? <Image source={{uri:ImageUri+userDetails.image}} style={styles.image} /> :
//                                        <Image source={require('../images/profile_pictur.jpeg')} style={styles.image} />)

const changePic=()=>{
    if (userDetails.id % 2 == 0) {
        navigation.navigate('CameraUse',{imageName:`profileDoctor${userDetails.id}`})
    }
    else{navigation.navigate('CameraUse',{imageName:`profilePatient${userDetails.id}`})
}}


    return (
        <>
            <DrawerContentScrollView>
                <View style={styles.header}>
                 <TouchableOpacity 
                 onPress={changePic}
                 >
                  {image}
                  </TouchableOpacity>
                    <Text style={styles.text}>Hello,</Text>
                    <Text style={styles.text} >{userDetails.name?userDetails.name:''}</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </>
    );
}
const styles = StyleSheet.create({

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: '7%',
        marginBottom: '2%',
        bottom: '5%'
    },
    image: {
        width: 78,
        height: 80,
        borderRadius: 1000,
        alignSelf: 'center',
        marginTop: '10%',
        borderColor: "white",
        borderWidth: 2
    },
    header: {
        backgroundColor: "#54BCC0",
        marginBottom: '2%',
        width: '100%',
        paddingTop: '5%'
    }
}

)