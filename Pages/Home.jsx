import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState,useContext,createContext } from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Loading from '../CTools/Loading';
import { Octicons } from '@expo/vector-icons';
import {UserContext} from '../CTools/UserDetailsHook'



//TODO fix bug login logout and log in agine
export default function Home(props) {
    const { navigation} = props
    const {userDetails} = useContext(UserContext);


    return (
        <View style={styles.container}>
            <Header
                title='Home'
                logo_image='heart'
                flex={0.4}
                image_width={100}
                image_heigt={50}
                paddingRight={9}
                possiton={68}
                image_margin={{ Bottom: 5 }}
            />

            <Button
                // text='Insert Data'
                justifyContent='flex-end'
                radius={1000}
                element={<Octicons name="plus" size={90} color="white" />}
                width={20}
                height={17}
                textSize={30}
                alignItems='center'
                onPress={() => navigation.navigate('Insert Data')}
            />
            {userDetails && <Text style={styles.textHello}> Hello {userDetails.name}</Text>}
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
        textShadowOffset: { width: 2, height: 2 },
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