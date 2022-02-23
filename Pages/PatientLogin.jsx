import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import { StatusBar } from 'expo-status-bar';

export default function PatientLogin(props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validtionUser, setValidtionUser] = useState('');
    console.log(validtionUser)

    const checkUser = () => {

        if (email == 1234) {
            setValidtionUser('');
        } else {
            setValidtionUser("Opps.. worng email");
        }
        if (password == 1234) {
            setValidtionUser('');
        } else {
            setValidtionUser("Opps.. worng password");
        }
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
                />

                <Input
                    label='Password'
                    secure={true}
                    justifyContent='flex-start'
                // height={}
                //width={}
                />
                <TouchableOpacity style={styles.forgotPassword} onPress={() => setShow(!show)}>
                    <Text >Forgot Password?</Text>
                </TouchableOpacity>
                <Text style={styles.validtionUser}>{validtionUser ? validtionUser : ''}</Text>
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
        top:'15%',
        fontSize:16,
        color:'white',
        borderColor:'white',
        backgroundColor:'#ff9900',
        borderWidth: 2,
        borderRadius: 10000,
    }
});