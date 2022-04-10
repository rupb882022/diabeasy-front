import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import { Get_userDetails } from '../Functions/Function'
import Loading from '../CTools/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { UserContext } from '../CTools/UserDetailsHook'


export default function Login({ navigation }) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validtionUser, setValidtionUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveUserDetails, setSaveUserDetails] = useState(false);

    const { userDetails, setUserDetails } = useContext(UserContext);

    //get user details from storge
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userDetails');
            setUserDetails(JSON.parse(jsonValue));
        }
        catch (e) {
            console.log("E=>", e)
        }
    }

    //for case the app save user details on first sign in or when user log Out
    useEffect(() => {
        if (!userDetails) {
            getData();
        }
    }, []);

    useEffect(() => {
        if (userDetails) {
            setLoading(true)
            navigation.navigate('Drawer');
            setInterval(() => setLoading(false), 2000);
        }
    }, [userDetails]);

    const checkUser = () => {
        setLoading(true);
        //get user details (id,image,full name)
        Get_userDetails(email, password).then((resulte) => {
            console.log(resulte);
            if (resulte) {
                set_User_Details(resulte);
                setValidtionUser("");
                setLoading(false);
            }
        },
            (error) => {
                setLoading(false);
                setValidtionUser("Opps.. worng password or Email");
                console.log("error in function Get_userDetails", error)
            })
    }

    const set_User_Details = async (resulte) => {

        //globle save user detail 
        saveUserDetails && await storeData({ id: resulte.id, image: resulte.profileimage, name: resulte.name })
        await setUserDetails({ id: resulte.id, image: resulte.profileimage, name: resulte.name })
        setInterval(() => setLoading(false), 1000);
        navigation.navigate('Drawer');
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('userDetails', jsonValue)
            console.log("userDetails", jsonValue)
        } catch (e) {
            await AsyncStorage.setItem('eror', e)
            setValidtionUser("sorry, app lost connection, please try to sign in agine");
        }
    }
    return (
        <View style={styles.container}>
            {loading && <Loading opacity={'#d6f2fc'} text='Logging you in !'/>}
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
                    onPress={() => { checkUser() }}
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
        flex: 1.2,
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