import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import GalleryPick from '../Pages/ImagePicker/GalleryPick';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomDrawer(props) {
    return (
        <>
            <DrawerContentScrollView>
                <View style={styles.header}>
                {/* <Image source={require('../images/profile_pictur.jpeg')}
                    style={styles.image}
                /> */}
                <GalleryPick />
                <Text style={styles.text}>Hello,</Text>
                <Text style={styles.text} >Itzik toledano</Text>
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
        paddingLeft: '5%',
        marginBottom: '2%',
    },
    image: {
        width: 78,
        height: 80,
        borderRadius: 1000,
        alignSelf: 'center',
        marginTop: '10%',
        borderColor:"white",
        borderWidth:2
    },
    header:{
        backgroundColor:"#54BCC0",
        marginBottom:'5%',
        width:'100%',
        padding:'2%'
        // bottom:'18%',
        // height:'70%'
    }
}

)