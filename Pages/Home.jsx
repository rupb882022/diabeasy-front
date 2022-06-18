import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import React, { useEffect, useState, useContext, useRef } from 'react';
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Loading from '../CTools/Loading';
import { Octicons } from '@expo/vector-icons';
import { UserContext } from '../CTools/UserDetailsHook'
import Moment from 'moment';
import registerForPushNotificationsAsync from '../CTools/registerForPushNotificationsAsync';
import { post_pushToken, GetLastBloodTest } from '../Functions/Function';
import TimeCounter from '../CTools/TimeCounter';
import { useFocusEffect } from '@react-navigation/native';


export default function Home(props) {
    const { navigation } = props
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [helloText, setHelloText] = useState();
    const [clock, setClock] = useState(null);
    const [initClock, setInitClock] = useState(false);
    //const [expoPushToken, setExpoPushToken] = useState('');
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const fadeIn = () => {
         Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };




    useEffect( () => {
        setLoading(true)
        registerForPushNotificationsAsync().then((token) => {
            let data = { "pushtoken": token };//console.log("data",data);
            post_pushToken(userDetails.id, data).then((response) => {
                response && console.log("res test Home=>", response.data);
                let temp = Object.assign({}, userDetails, { Token: token });
                setUserDetails(temp)
            }).then(() => {
                fadeIn();
                setLoading(false)
            })
        }).catch((error) => {
            setAlert(
                <Alert text="sorry, somthing went wrong, please try again later"
                    type='worng'
                    time={2000}
                    bottom={110}
                />)
            console.log("error in function post_pushToken " + error);
            setLoading(false)
        });

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            userDetails && userDetails.id ? GetLastBloodTest(userDetails.id).then((respone) => {
                console.log("*", respone)
                let diffMs = (new Date() - new Date(respone));
                let diffDays = Math.floor(diffMs / 86400000); // days
                let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                setClock({ hour: diffHrs, minute: diffMins, days: diffDays })
                setInitClock(true);
            }).catch((error) => {
                console.log("error in function GetLastBloodTest " + error);
            }) : '';


          initClock && setInterval(() => setInitClock(false), 100);
        }, []))

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
             {!clock||loading?<Loading/>:<></>}
            <Header
                title='Home'
                logo_image='heart'
                flex={0.25}
                // image_width={100}
                // image_heigt={50}
                paddingRight={9}
                possiton={29}
                bottom={20}
                image_margin={{ Bottom: 5 }}
            />

            {clock && <Animated.View style={[
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim
                }
            ]}>
                <Text style={styles.lastTest}>The last blood test was</Text>
                <TimeCounter
                    initialHours={clock.hour}
                    initialMinute={clock.minute}
                    days={clock.days ? clock.days : 0}
                    init={initClock}
                />

            </Animated.View>}
            <Animated.View style={{ flex: 1.9, paddingTop: '10%', opacity: fadeAnim }}>
                <Button
                    // text='Insert Data'
                    justifyContent='flex-end'
                    radius={1000}
                    element={<><Octicons style={{ paddingLeft: '10%' }} name="plus" size={80} color="white" />
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', right: '2%' }}>Insert data</Text>
                    </>}
                    width={13}
                    height={13}
                    textSize={30}
                    alignItems='center'
                    onPress={() => navigation.navigate('Insert Data')}
                />
                {userDetails && <><Text style={styles.textHello}>{helloText}</Text>
                    <Text style={styles.textName}>{userDetails.name}</Text></>}
                    <Image
                style={styles.Image}
                source={require('../images/home_img.webp.png')}
            />
            </Animated.View>

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
    lastTest: {
        color: '#1ea6d6',
        textAlign: 'center',
        fontSize: 26,
        // fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    Image: {
        flex: 0.8,
        position: 'relative',
        resizeMode: 'cover',
        width: '40%',
        // height:'130%',
        top: '1%',
        alignSelf: 'flex-end',
        opacity: 0.95,
    }
});