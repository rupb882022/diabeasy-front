import { View, Text,Image,StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
export default function CustomDrawer(props) {
    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView>
            <Image source={{uri:'https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859'}}
            style={styles.image}
            />
            <Text style={styles.text}>hello,</Text>
            <Text style={styles.text} >Itzik toledano</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        </View>
    );
}
const styles = StyleSheet.create({

    text:{
        fontSize:20,
        fontWeight:'bold',
        paddingLeft:'5%',
        marginBottom:'2%'
    },
    image:{
        width:78,
        height:80,
        borderRadius:1000,
        alignSelf:'center',
        marginTop:'5%'
    }
}
    
    )