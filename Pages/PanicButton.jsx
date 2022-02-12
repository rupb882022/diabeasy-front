import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../CTools/Header';
import Button from '../CTools/Button'
import Communications from "react-native-communications";
import upiUrl from '../Routes/Url'



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
        fetch(upiUrl + `Patients?url=assistant_phone&id=${id}`, {
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
                title='Panic Button'
                logo_image='panic'
                flex={0.2}
                image_width={30}
                image_heigt={100}
                image_margin={{ Bottom: -4 }}
                marginLeft={6}
                possiton={70}
            />
            <Button
                text='Panic Button'
                justifyContent='flex-start'
                radius={1000}
                width={13}
                height={30}
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