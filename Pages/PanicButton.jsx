import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../CTools/Header';
import Button from '../CTools/Button'
import Communications from "react-native-communications";
import apiUrl from '../Routes/Url'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function PanicButton({ route }) {
    const [phone, setPhone] = useState();
    const [alert, setAlert] = useState();
    let userDetails = route.params.userDetails;

    const EmergancyCall = () => {
        console.log(phone)
        getPhone();
        let Sphone = phone && phone.toString();
        if (Sphone) {
            Communications.phonecall(Sphone, true)
        }
    }

    const getPhone = () => {
        if (!phone && userDetails) {
            fetch(apiUrl + `Patients?url=assistant_phone&id=${userDetails.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'appliction/json; charset=UTF-8',
                    'Accept': 'appliction/json; charset=UTF-8'
                })
            }).then(res => {
                if (res && res.status == 200) {
                    return res.json();
                } else {
                    console.log("status code:", res.status)
                }
            }).then((resulte) => {
                resulte ? setPhone(resulte) : setAlert("sorry.. we did not found your energency person, you can go to setting page to add one")

            },
                (error) => {
                    console.log("error", error)
                })
        }
    }
    useEffect(() => {
        //get phone number
        getPhone();
    }, [userDetails]);

    //todo clear alert when emergency call is update in setting page
    return (
        <View style={styles.container}>
            <Header
                title='Emergency Call'
                logo_image='panic'
                flex={0.2}
                image_width={25}
                image_heigt={100}
                image_margin={{ Bottom: -4 }}
                possiton={70}
                marginLeft={12}
            />
            <Button
                // text='Panic Button'
                element={<Feather style={{ opacity: 0.85, width: '100%', alignSelf: 'flex-start' }} name="phone-call" size={105} color="white" />}
                justifyContent='flex-start'
                radius={1000}
                width={16}
                height={16}
                textSize={30}
                alignItems='center'
                color='#ff9900'
                onPress={EmergancyCall}
            />
            {alert && <View style={styles.alert_Container}>
                <View style={styles.alert}>
                    <Ionicons name="alert-circle-outline" size={28} color="black" />
                    <Text style={styles.alertText}>
                        {alert}</Text>
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    alertText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    alert: {
        alignItems: 'center',
        borderColor: '#ff9900',
        position: 'relative',
        borderRadius: 20,
        borderWidth: 4,
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '2%'
    },
    alert_Container: {
        bottom: '35%',
        paddingLeft: '5%',
        paddingRight: '5%',
    }

})