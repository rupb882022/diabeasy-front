import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import {Get_all_InsulinType,Post_user_details} from '../Functions/Function'
import Alert from '../CTools/Alert';

export default function PersonalInfo2(props) {
    const { route, navigation } = props

    let userInfo = route.params.userInfo;
    const [loading, setLoading] = useState(true);
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [insulinTypeShort, setInsulinTypeShort] = useState();
    const [insulinTypeLong, setInsulinTypeLong] = useState(null);
    // const [spot, setSpot] = useState();
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [mailDoctor, setMailDoctor] = useState(null);
    const [selectInsulinLong, setSelectInsulinLong] = useState(null);
    const [selectInsuliShort, setSelectInsulinShort] = useState(null);
    const [alert, setAlert] = useState()

    useEffect(() => {
        setInterval(() => setLoading(false), 1500);
    }, []);

    const checkRegister = () => {
        //if only insulinTypeShort it is means that user use Pump
        if (insulinTypeShort && height && weight) {
           if(height<10 && weight<10){
            setAlert(
                <Alert text="weight and height need to be up to 10"
                type='alert'
                time={3000}
                bottom={110}
                />)
                return;
           }
            let moreInfo = {
                weight: weight,
                height: height,
                InsulinType_id: insulinTypeShort,
                InsulinType_long_id: insulinTypeLong,
                phoneNumber: phoneNumber,
                mailDoctor: mailDoctor
            }
            let userDetilas = Object.assign({}, userInfo, moreInfo)
            RegisterUser(userDetilas);
        } else {
            setAlert(
                <Alert text="please fill in the required detilas weight,height,insulin type"
                type='alert'
                time={3000}
                bottom={110}
                />)
        }
    }
    const RegisterUser = (userDetilas) => {
        setLoading(true);
        Post_user_details(userDetilas)
            .then((response) => {
                setLoading(false);
                response&& navigation.navigate('Login') //Todo approve the register
            })
            .catch((error) => {
                setAlert(
                    <Alert text="sorry somthing went worng try agine later"
                    type='worng'
                    time={2000}
                    bottom={110}
                    />)
                    console.log("error in function Post_user_details"+error)
                setLoading(false);
            });
    }

    const getInsulinType = () => {
        Get_all_InsulinType().then((resulte) => {
            let longType = [];
            let shortType = [];
            resulte.map((x, i) => {
                let obj = { itemKey: i, label: x.name, value: x.id }
                x.type == 'short' ? shortType.push(obj) : longType.push(obj)
            })
            setSelectInsulinLong(longType);
            setSelectInsulinShort(shortType);
        },
            (error) => {
                console.log("error in function Get_all_InsulinType ", error)
            })
    }

    if (!selectInsuliShort && !selectInsulinLong) {
        getInsulinType();
    }
    return (<>
        <View style={styles.container}>
            {loading && <Loading opacity={'#d6f2fc'} />}
            <Header
                title='Medical Info'
                possiton={-10}
                marginLeft={4}
                line={false}
            />
            <View style={styles.inputs}>
                <View style={{ flexDirection: 'row', flex: 1, marginLeft: '6%' }}>
                    <Input
                        label='Weight'
                        width={70}
                        alignItems='center'
                        validtion='number'
                        keyboardType='number-pad'
                        placeholder='  kg'
                        required={true}
                        getValue={(value) => setWeight(value)}
                    />

                    <Input
                        label='Height'
                        validtion='number'
                        keyboardType='number-pad'
                        placeholder='cm'
                        width={70}
                        alignItems='flex-start'
                        required={true}
                        getValue={(value) => setHeight(value)}
                    />
                </View>
                <Input
                    label='Emergency Contact Phone Number'
                    validtion='number'
                    keyboardType='number-pad'
                   // placeholder='+972'
                    getValue={(value) => setPhoneNumber(value)}
                />

                <Input
                    label='Add Your Doctor By Email'
                    keyboardType='email-address'
                    getValue={(value) => setMailDoctor(value)}
                />
                <Input
                    label='Short insulin type'
                    required={true}
                    type='selectBox'
                    editable={false}
                    getValue={(value) => setInsulinTypeShort(value)}
                    SelectBox_placeholder='Select short insulin type'
                    selectBox_items={selectInsuliShort}
                />
                <Input
                    label='Long insulin type'
                    required={true}
                    type='selectBox'
                    selectSide='right'
                    editable={false}
                    getValue={(value) => setInsulinTypeLong(value)}
                    SelectBox_placeholder='Select long insulin type'
                    selectBox_items={selectInsulinLong}
                />
                {/* <Input
                label='injection spot'
                editable={false}
                type='selectBox'
                required={true}
                getValue={(value) => setSpot(value)}
                SelectBox_placeholder='Select spot of injection'
                selectBox_items={[
                    { itemKey: 0, label: 'Arm', value: 'Arm' },
                    { itemKey: 1, label: 'Belly', value: 'Belly' },
                    { itemKey: 2, label: 'Leg', value: 'Leg' },
                    { itemKey: 3, label: 'Buttock', value: 'Buttock' },
                ]} /> */}

            </View>

            {/* Register Page Button */}
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
                <View style={styles.Register}>
                    <Text style={styles.txt}> 2/2</Text>
                    <Button
                        text="Register"
                        width={8}
                        height={4}
                        justifyContent='center'
                        onPress={checkRegister}
                    />
                </View>
            </View>
        </View>
        {alert&&alert}</>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    Buttons: {
        flex: 1,
        flexDirection: 'row',
        bottom: '2%'
    },
    back: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '4%'
    },
    Register: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '10%',
        marginBottom:'7%'
    },
    txt: {
        paddingRight: '3%',
        top: '20%'
    },
    inputs: {
        flex: 4,
        justifyContent: 'flex-start',
        bottom: '2%'
    }
});