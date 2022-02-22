import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Header from '../CTools/Header';
import Button from '../CTools/Button'
import Communications from "react-native-communications";
import apiUrl from '../Routes/Url'
import { Feather } from '@expo/vector-icons'; 



export default function PanicButton(props) {
    const [phone, setPhone] = useState();
    // const {id}=props
    id=1;
    const EmergancyCall = () => {
        console.log(phone)
        let Sphone=phone&&phone.toString();
        if(Sphone){
        Communications.phonecall(Sphone, true)
        }
    }

    if (!phone) {
        fetch(apiUrl + `Patients?url=assistant_phone&id=${id}`, {
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
            setPhone(resulte);
        },
            (error) => {
                console.log("error", error)
            })
    }
    return (
        <View style={styles.container}>
            <Header
                title='Emergency Call'
                logo_image='panic'
                flex={0.2}
                image_width={25}  
                image_heigt={100}
                image_margin={{ Bottom: -4}}
                possiton={70}
                marginLeft={12}
            />
            <Button
                // text='Panic Button'
                element={<Feather style={{opacity:0.85, width:'100%',alignSelf:'flex-start'}} name="phone-call" size={105} color="white" />}
                justifyContent='flex-start'
                radius={1000}
                width={16}
                height={16}
                textSize={30}
                alignItems='center'
                color='#ff9900'
                onPress={EmergancyCall}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})