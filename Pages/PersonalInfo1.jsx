import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
//import PickerMenu from './ImagePicker/PickerMenu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../CTools/Loading';
import { flushSync } from 'react-dom'
import apiUrl from '../Routes/Url'
import axios from "axios";



export default function PersonalInfo1(props) {
    const { route, navigation } = props

    let user = route.params.user;
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validtion, setValidtion] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setInterval(() => setLoading(false), 1500);
    }, [])



    // const sheetRef = useRef(null);
    // //close menu picture picker
    // const closeSheet = () => {
    //     if (sheetRef.current) {
    //         sheetRef.current.close();
    //     }
    // };
    // //open menu picture picker
    // const openSheet = () => {
    //     if (sheetRef.current) {
    //         sheetRef.current.open();
    //     }
    // };

    const passwordValid = (value) => {
        //wiil render the page at the end of function
        flushSync(() => {
            password == value ? setValidtion('') : setValidtion('not the same password')
        })
    }

    const nextPage = () => {
        if (FirstName && email && password && gender && birthDate) {
            setLoading(true);
            navigation.navigate('PersonalInfo2',
                {
                    userInfo: {
                        firstName: FirstName,
                        lastName: LastName,
                        email: email,
                        password: password,
                        gender: gender,
                        BirthDate: birthDate
                    }
                })
        } else {
            alert("please fill in all details");
        }
    }


    const RegisterUser = () => {
        if (FirstName && email && password && gender && birthDate) {
         let userDetilas = {
                firstName: FirstName,
                lastName: LastName,
                email: email,
                password: password,
                gender: gender,
                BirthDate: birthDate
            }
            const configurationObject = {
                url: `${apiUrl}User/RegisterUser`,
                method: "POST",
                data: userDetilas
            };
            console.log("userDetilas",userDetilas);
            axios(configurationObject)
                .then((response) => {
                    console.log("status=", response.status)
                    console.log("status=", response)
                    if (response.status === 200 || response.status === 201) {
                        navigation.navigate('Login') //Todo approve the register
                    } else if (response.status === 409) {
                        console.log("response2", response);
                    } else {
                        throw new Error("An error has occurred");
                    }
                })
                .catch((error) => {
                    if (error.status === 409) {
                        console.log("response2", response);
                    }else{
                    console.log(error);
                    }
                })
        }
        else {
            alert("please fill in all details");
        }
    }

    //Todo fix validtion label in last and first name
    return (
        <View style={styles.container}>
            {loading && <Loading opacity={'#d6f2fc'} />}
            <Header
                title='Personal Info'
                possiton={-15}
                marginLeft={4}
                line={false}
            />
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'space-around' }}>
                <Input
                    label='First Name'
                    validtion='letters'
                    required={true}
                    setValue={FirstName}
                    width={55}
                    getValue={(value) => setFirstName(value)}
                    alignItems='center'
                />
                <Input
                    label='Last Name'
                    validtion='letters'
                    required={true}
                    setValue={LastName}
                    width={75}
                    getValue={(value) => setLastName(value)}
                    alignItems='flex-start'
                />
            </View>
            <Input
                label='Email'
                keyboardType='email-address'
                getValue={(value) => setEmail(value)}
                required={true}
                setValue={email}
            />
            <Input
                label='Password'
                secure={true}
                validtion='Password'
                getValue={(value) => setPassword(value)}
                required={true}
                setValue={password}
            // TODO eye icon
            />
            <Input
                label='Confirm Password'
                secure={true}
                required={true}
                validLable={validtion && validtion}
                getValue={(value) => { passwordValid(value) }}
            // validtion='password'
            // TODO eye icon
            />

            <Input
                label='Gender'
                editable={false}
                type='selectBox'
                required={true}
                setValue={gender}
                SelectBox_placeholder='Gender'
                getValue={(value) => setGender(value)}
                selectBox_items={[
                    { itemKey: 0, label: 'Male', value: 'M' },
                    { itemKey: 1, label: 'Female', value: 'F' },
                    { itemKey: 2, label: 'Other', value: 'O' },
                ]} />

            <Input
                popup_title='Your Birth Date'
                label='Date Of Birth '
                type='date'
                mode='date'
                min={new Date(1920, 1, 1)}
                editable={false}
                display='spinner'
                date_format_hour={false}
                required={true}
                setValue={birthDate}
                getValue={(value) => setBirthDate(value)}
            />


            <View style={styles.uploadbutton}>
                <Text>Upload Profile Picture</Text>
                {user == 'Doctor' ?
                    <Button
                        element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />}
                        width={5}
                        height={3}
                        onPress={() => { navigation.navigate('CameraUse', { imageName: 'profileDoctor' }) }}
                    /> :
                    <Button
                        element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />}
                        width={5}
                        height={3}
                        onPress={() => { navigation.navigate('CameraUse', { imageName: 'profilePatient' }) }}
                    />
                }
            </View>

            <View style={styles.Next}>
                {user == "Doctor" ? <Button
                    text="Register"
                    width={10}
                    height={2}
                    justifyContent='flex-start'
                    onPress={RegisterUser}
                /> : <>
                    <Text style={styles.txt}> 1/2</Text>
                    <Button
                        text="Next"
                        width={10}
                        height={2}
                        justifyContent='flex-start'
                        onPress={nextPage}
                    /></>
                }
            </View>
            {/* <PickerMenu ref={sheetRef} /> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        top: '2%'
    },
    Next: {
        flex: 1.3,
        alignItems: 'flex-end',
        marginRight: '5%'
    },
    txt: {
        paddingRight: '3%',
        paddingBottom: '1%'
    },
    uploadbutton: {
        flex: 1,
        paddingLeft: 50
    },
    logo: {
        width: 40,
        height: 40
    }

});