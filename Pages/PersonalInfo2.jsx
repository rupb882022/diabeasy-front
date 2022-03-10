import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import axios from "axios";
import apiUrl from '../Routes/Url'

export default function PersonalInfo2(props) {
    const { route, navigation } = props

    let userInfo = route.params.userInfo;
    const [loading, setLoading] = useState(true);
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [insulinTypeShort, setInsulinTypeShort] = useState();
    const [insulinTypeLong,setInsulinTypeLong]=useState();
    // const [spot, setSpot] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [mailDoctor, setMailDoctor] = useState();
    const [selectInsulinLong, setSelectInsulinLong] = useState();
    const [selectInsuliShort, setSelectInsulinShort] = useState();

    useEffect(() => {
        setInterval(() => setLoading(false), 1500);
    }, []);

    const checkRegister = () => {
        //if only insulinTypeShort it is means that user use Pump
        if (insulinTypeShort && height && weight) {
            setLoading(true);
            let moreInfo = {
                weight: weight,
                height: height,
                id_insulinTypeShort: insulinTypeShort,
                id_insulinTypeLong:insulinTypeLong,
                phoneNumber: phoneNumber,
                mailDoctor: mailDoctor
            }
            let userDetilas = Object.assign({}, userInfo, moreInfo)
            console.log("userDetilas", userDetilas);
            RegisterUser(userDetilas);

        } else {
            alert("please fill in the required detilas\n weight,height,insulin type")
        }
    }
    const RegisterUser = (userDetilas) => {
        const configurationObject = {
            url: `${apiUrl}User/RegisterUser`,
            method: "POST",
            data: userDetilas
        };
        axios(configurationObject)
            .then((response) => {
                console.log("status=",response.status)
                console.log("status=",response)
                if (response.status === 200 || response.status === 201) {
                    navigation.navigate('Login') //Todo approve the register
                } else {
                    throw new Error("An error has occurred");
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    const getInsulinType = () => {
        fetch(apiUrl + `User/getInsulinType`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'appliction/json; charset=UTF-8',
                'Accept': 'appliction/json; charset=UTF-8'
            })
        }).then(res => {
            console.log("res",res.status)
            if (res && res.status == 200) {
                return res.json();
            } else {
                console.log("status code:", res.status)
            }
        }).then((resulte) => {
            let longType=[];
            let shortType=[];
           resulte.map(x=>{  let obj={itemKey:x.id,label:x.name, value:x.id}
          x.type=='short'? shortType.push(obj):longType.push(obj)
        })
        console.log("longType========>",longType);
        console.log("shortType",shortType);
        setSelectInsulinLong(longType);
            setSelectInsulinShort(shortType);
        },
            (error) => {
                console.log("error", error)
            })
    }

    if(!selectInsuliShort&&!selectInsulinLong){
        getInsulinType();
    }
    return (
        <View style={styles.container}>
            {loading && <Loading opacity={'#d6f2fc'} />}
            <Header
                title='Medical Info'
                possiton={-15}
                marginLeft={4}
                line={false}
            />
                        <View style={{flexDirection:'row',flex:1,marginLeft:'6%'}}>
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
            <Input
                label='Emergency Contact Phone Number'
                validtion='number'
                keyboardType='number-pad'
                placeholder='+972'
                getValue={(value) => setPhoneNumber(value)}
            />

            <Input
                label='Add Your Doctor By Email'
                keyboardType='email-address'
                getValue={(value) => setMailDoctor(value)}
            />


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
                        justifyContent='flex-start'
                        onPress={checkRegister}
                    />
                </View>
            </View>
        </View>
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
        marginRight: '10%'
    },
    txt: {
        paddingRight: '3%',
        paddingBottom: '1%'
    },

});