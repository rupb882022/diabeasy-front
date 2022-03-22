import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Loading from '../CTools/Loading';
import { Octicons } from '@expo/vector-icons';
import { UserContext } from '../CTools/UserDetailsHook'
import Moment from 'moment';


export default function Home(props) {
    const { navigation } = props
    const { userDetails } = useContext(UserContext);
    const [helloText, setHelloText] = useState();





    if (!helloText) {
        let hour = Moment(new Date()).format('HH:mm:ss');
        let array = hour.split(":");
        hour = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
        hour >= 21600 && hour < 43200 ? setHelloText("Good morning") ://21600="06:00:00"
            hour >= 43200 && hour < 64800 ? setHelloText("Good afternoon") ://43200=12:00:00
                setHelloText("Good evening");//64800=18:00
    }

    return (
        <View style={styles.container}>
            <Header
                title='Home'
                logo_image='heart'
                flex={0.5}
                image_width={100}
                image_heigt={50}
                paddingRight={9}
                possiton={50}
                image_margin={{ Bottom: 5 }}
            />
            <View style={{flex:1.8,paddingTop:'10%'}}>
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
                {userDetails && <><Text style={styles.textHello}>{helloText}</Text>
                    <Text style={styles.textName}>{userDetails.name}</Text></>}
            </View>
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
        justifyContent: 'center'
    },
    textName: {
        color: '#1ea6d6',
        alignSelf: 'flex-start',
        fontSize: 32,
        paddingLeft: '5%',
        paddingTop: '15%',
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3
    },
    textHello: {
        color: '#1ea6d6',
        alignSelf: 'flex-start',
        fontSize: 32,
        paddingLeft: '4%',
        top: '10%',
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    Image: {
        flex: 0.8,
        // position:'absolute',
        resizeMode: 'center',
        width: '40%',
        top: '1%',
        alignSelf: 'flex-end',
        opacity: 0.95,
    }
});