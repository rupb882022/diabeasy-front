import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import apiUrl from '../Routes/Url'
import Loading from '../CTools/Loading';

export default function Login({ navigation }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validtionUser, setValidtionUser] = useState('');
    const [loading, setLoading] = useState(false);

    const checkUser = () => {
        console.log("validtionUser", validtionUser);
        console.log("password", password);
        console.log("email", email);

        setLoading(true);
        //get user details (id,image,full name)
        console.log("url", apiUrl + `Patients?url=userDetails&email=${email}&password=${password}`);
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
            console.log("resulte", resulte)
            if (resulte) {
                setInterval(() => setLoading(false), 3500);
                navigation.navigate('Drawer');
            } else {
                setValidtionUser("Opps.. worng password or Email");
                setLoading(false);
                return;
            }


        },
            (error) => {
                console.log("error", error)
            })
    }
    return (
        <View style={styles.container}>
            {loading && <Loading opacity={'#ffffffff'} />}
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
                />
                <TouchableOpacity style={styles.forgotPassword} onPress={() => setShow(true)}>
                    <Text >Forgot Password?</Text>
                </TouchableOpacity>
                {validtionUser ? <Text style={styles.validtionUser}> {validtionUser} </Text> : <></>}
            </View>

            {show ?
                <ForgotPasswordPopUp
                    setShow={(isShow) => setShow(isShow)}
                />
                : <></>}
            <View style={styles.Buttons}>
                <Button
                    text="Sign In"
                    width={12}
                    height={4}
                    alignItems='center'
                    justifyContent='flex-end'
                    onPress={checkUser}
                />
                <Button
                    text="Sign Up"
                    width={12}
                    height={4}
                    alignItems='center'
                    justifyContent='flex-end'
                    onPress={()=>navigation.navigate('SignUp')}
                />
            </View>
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
        height: '27%',
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
    },
    Buttons:{
        flexDirection:'row',
        flex:0.8,
    }
});