import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import apiUrl from '../Routes/Url'
import Loading from '../CTools/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';




export default function Login({ navigation }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validtionUser, setValidtionUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveUserDetails, setSaveUserDetails] = useState(false);

    //get user details from storge
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userDetails');
            console.log('jsonValue',jsonValue);
           setUserDetails(JSON.parse(jsonValue));
            console.log("userDetails", userDetails)
        } catch (e) {
            console.log(e)
        }
    }
    const [userDetails, setUserDetails] = useState();

    const cheackStorge = () => {
        console.log("@");
        if (userDetails && userDetails.rememberMe) {
            navigation.navigate('Drawer', { userDetails: userDetails });
        }
    }
    //for case the app save user details on first sign in or when user logOut
    useFocusEffect(
        React.useCallback(() => {
            getData();
        })
    );

    useEffect(() => {
        cheackStorge();
    }, [userDetails]);

    const checkUser = () => {
        setLoading(true);
        //get user details (id,image,full name)
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
            if (resulte) {
                console.log("res=>",resulte)
                setInterval(() => setLoading(false), 2000);
                console.log("res=>",resulte)
                //globle save user detail 
                storeData({ id: resulte.id, image: resulte.profileimage, name: resulte.name, rememberMe: saveUserDetails })
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

    const storeData = async (value) => {
        try {
            console.log("value",value)
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('userDetails', jsonValue)
            console.log("jsonValue",jsonValue)
             navigation.navigate('Drawer', { userDetails: jsonValue });
        } catch (e) {
            await AsyncStorage.setItem('eror', e)
            setValidtionUser("sorry, app lost connection, please try to sign in agine");
        }
    }

    return (
        <View style={styles.container}>
            {loading && <Loading opacity={'#d6f2fc'} />}
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
                <View style={styles.saveUserDetails}>

                    <Button
                        element={saveUserDetails ? <Fontisto name="checkbox-active" size={15} color="black" /> :
                            <Fontisto name="checkbox-passive" size={15} color="black" />}
                        width={6}
                        height={6}
                        radius={7}
                        color='transparent'
                        alignItems='center'
                        borderColor='transparent'
                        onPress={() => { setSaveUserDetails(!saveUserDetails) }}

                    />
                    <Text style={styles.saveUserDetailsText}>Remember me</Text>
                </View>
            </View>
            {validtionUser ? <Text style={styles.validtionUser}> {validtionUser} </Text> : <></>}
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
                    onPress={() => navigation.navigate('SignUp')}
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
        // flex:0.15,
        alignSelf: 'center',
        top: '6%',
        fontSize: 16,
        textAlign: 'center',
        width: '76%',
        color: 'white',
        borderColor: 'white',
        backgroundColor: '#ff9900',
        borderWidth: 2,
        borderRadius: 10000,
    },
    Buttons: {
        flexDirection: 'row',
        flex: 0.8,
    },
    saveUserDetails: {
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: 'row',
        width: '60%',
        bottom: '7%'
    },
    saveUserDetailsText: {
        marginRight: '5%',
        right: '120%'
    }
});