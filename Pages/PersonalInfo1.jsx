import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
//import PickerMenu from './ImagePicker/PickerMenu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../CTools/Loading';
import { flushSync } from 'react-dom'
import apiUrl from '../Routes/Url'
import axios from "axios";
import Alert from '../CTools/Alert';


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
    const [alert, setAlert] = useState()

    useEffect(() => {
        setInterval(() => setLoading(false), 1500);
    }, [])


    const passwordValid = (value) => {
        //wiil render the page at the end of function
        flushSync(() => {
            password == value ? setValidtion('') : setValidtion(' not the same password')
        })
    }
    const checkValid = () => {
        //valid short names

        if ((FirstName && FirstName.length < 2) || (LastName && LastName.length < 2)) {
            setAlert(
                <Alert text="minimum 2 letters for first and last name"
                type='alert'
                time={2500}
                bottom={80}
                />)
            console.log("FirstName.length", FirstName.length);
            return false;
        }
        //valid worng mail
        if (email && (!email.includes("@") || !email.includes("."))) {
            setAlert(
                <Alert text="worng email input"
                type='alert'
                time={2000}
                bottom={80}
                />)
            return false;
        }
        if (!FirstName || !email || !password || !gender || !birthDate) {
            setAlert(
                <Alert text="please fill in all details"
                type='alert'
                time={2500}
                bottom={80}
                />)
            return false;
        }
        return true;
    }
    const nextPage = () => {

        if (checkValid()) {
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
        }
    }


    const RegisterUser = () => {
        if (checkValid()) {
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
            console.log("userDetilas", userDetilas);
            axios(configurationObject)
                .then((response) => {
                    console.log("status=", response.status)
                    console.log("status=", response)
                    if (response.status === 200 || response.status === 201) {
                        navigation.navigate('Login') //Todo approve the register
                    } else if (response.status === 409) {
                        setAlert(
                            <Alert text="email is allready exist"
                            type='alert'
                            time={2000}
                            bottom={80}
                            />)
                    } else {
                        throw new Error("An error has occurred");
                    }
                })
                .catch((error) => {
                    if (error.status === 409) {
                        setAlert(
                            <Alert text="email is allready exist"
                            type='alert'
                            time={2000}
                            bottom={80}
                            />)
                    } else {
                        setAlert(
                            <Alert text="sorry somting is got wotng try agine later"
                            type='worng'
                            time={2000}
                            bottom={80}
                            />)
                        console.log(error);
                    }
                })
        }
    }


    //Todo fix validtion label in last and first name
    return (<>
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
                    setValue={FirstName}
                    width={55}
                    getValue={(value) => setFirstName(value)}
                    alignItems='center'
                />
                <Input
                    label='Last Name'
                    validtion='letters'
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
                    { itemKey: 0, label: 'Male', value: 'm' },
                    { itemKey: 1, label: 'Female', value: 'f' },
                    { itemKey: 2, label: 'Other', value: 'o' },
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
                <Button
                    element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />}
                    width={5}
                    height={3}
                    onPress={() => { navigation.navigate('CameraUse', { imageName: user == 'Doctor' ? 'profileDoctor' : 'profilePatient' }) }}
                />
            </View>

            <View style={styles.Buttons}>
                <View style={styles.back}>
                    <Button
                        text="back"
                        width={12}
                        height={4}
                        justifyContent='center'
                        onPress={() => { setLoading(true); navigation.goBack() }}
                    />
                </View>

                {user == "Doctor" ? <>
                    <View style={styles.Register}>
                        <Button
                            text="Register"
                            width={10}
                            height={4}
                            alignItems='center'
                            justifyContent='flex-start'
                            onPress={RegisterUser}
                        />
                    </View>
                </>
                    :
                    <>
                        <View style={styles.txt}>
                            <Text>1/2</Text>
                        </View>
                        <View style={styles.Next}>
                            <Button
                                alignItems='flex-end'
                                text="Next"
                                width={12}
                                height={4}
                                justifyContent='flex-start'
                                onPress={nextPage}
                            /></View></>
                }
            </View>
        </View>
        {alert&&alert}
</>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        top: '2%'
    },
    Next: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '13%',
        marginTop: '6%'
    },
    txt: {
        left: '150%',
        paddingBottom: '1%'
    },
    uploadbutton: {
        flex: 1,
        paddingLeft: 50
    },
    logo: {
        width: 40,
        height: 40
    },
    Buttons: {
        flex: 1,
        flexDirection: 'row',
        bottom: '2%',
        marginLeft: '2%'
    },
    back: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '4%',
    },
    Register: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '13%',
        marginTop: '5%'
    }

});