import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import apiUrl from '../Routes/Url'

export default function Login({ navigation }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validtionUser, setValidtionUser] = useState('');


    const checkUser = () => {
        console.log("validtionUser", validtionUser);
        console.log("password", password);
        console.log("email", email);


        //get user details (id,image,full name)
        console.log("url",apiUrl + `Patients?url=userDetails&email=${email}&password=${password}`);
        fetch(apiUrl + `Patients?url=userDetails&email=${email}&password=${password}`, {
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
            console.log("resulte",resulte)
            if (resulte) {
                navigation.navigate('Drawer')
            }else {
                setValidtionUser("Opps.. worng password or Email");
                return;
            }

        },
            (error) => {
                console.log("error", error)
            })
    }
    return (
        <View style={styles.container}>
            <Header
                title='Login'
                logo_image='diabeasy'
                image_width={100}
                image_heigt={200}
                flexDirection="column-reverse"
                alignItems='center'
                paddingRight={25}
                justifyContent='space-evenly'
                line={false}
                possiton={60}
            />
            <View style={styles.inputs}>
                <Input
                    label='Email'
                    keyboardType='email-address'
                    justifyContent='flex-end'
                    getValue={setEmail}
                />

                <Input
                    label='Password'
                    secure={true}
                    justifyContent='flex-start'
                    getValue={setPassword}
                // height={}
                //width={}
                />
                <TouchableOpacity style={styles.forgotPassword} onPress={() => setShow(!show)}>
                    <Text >Forgot Password?</Text>
                </TouchableOpacity>
                {validtionUser ? <Text style={styles.validtionUser}> {validtionUser} </Text> : <></>}
            </View>

            {show ?
                <ForgotPasswordPopUp
                    setShow={(isShow) => setShow(isShow)}
                />
                : <></>}

            <Button
                text="LogIn"
                width={20}
                height={4}
                alignItems='center'
                justifyContent='flex-end'
                onPress={checkUser}
            />

            <Image
                style={styles.Image}
                source={require('../images/login.JPG.png')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    Image: {
        height: '25%',
        resizeMode: 'cover',
        width: '50%',
        alignSelf: 'center',
        opacity: 0.95,
        marginBottom: '4%',
        marginTop: '10%'
    },
    inputs: {
        flex: 1,
        // position: 'relative',
        top: '5%',
        alignContent: 'stretch',
        paddingTop: '15%'

    },
    forgotPassword: {
        alignItems: 'flex-end',
        paddingRight: '12%',
        //justifyContent: 'flex-start'
    },
    validtionUser: {
        alignSelf: 'center',
        top: '15%',
        fontSize: 16,
        color: 'white',
        borderColor: 'white',
        backgroundColor: '#ff9900',
        borderWidth: 2,
        borderRadius: 10000,
    }
});