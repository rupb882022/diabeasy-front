import { View, Text, StyleSheet,TouchableWithoutFeedback,Keyboard,KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../CTools/Header';
import Button from '../CTools/Button'
import Communications from "react-native-communications";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../CTools/UserDetailsHook';
import { GET_assistant_phone,POST_EmergancyPhoneNumber } from '../Functions/Function';
import  Input from '../CTools/Input';
import AlertTool from '../CTools/Alert';
export default function PanicButton() {
    const [phone, setPhone] = useState();
    const [alert, setAlert] = useState();
    const { userDetails } = useContext(UserContext);
    const [newPhone, setNewPhone] = useState();
    const [alertTool, setAlertTool] = useState();

    const EmergancyCall = () => {
        getPhone();
        let Sphone = phone && phone.toString();
        if (Sphone) {
            Communications.phonecall(Sphone, true)
        }
    }

    const getPhone = () => {
        if (!phone && userDetails) {
            GET_assistant_phone(userDetails.id).then((resulte) => {
                console.log("resulte", resulte);
                if (resulte) {
                    setPhone(resulte);
                }
                else {
                    throw new Error();
                }
            }, (error) => {
                console.log(error + " GET_assistant_phone")
                setAlert("Sorry.. we did not found your energency phone number")
            });
        }
    }

    const saveNumber=()=>{
        if (newPhone && !phone) {
        POST_EmergancyPhoneNumber(userDetails.id,newPhone.toString()).then((resulte)=>{
        resulte&&console.log('resultePhoneNumber TEST');
        setPhone(newPhone);
        setAlert();
        setAlertTool(
            <AlertTool text="Phone number succesfully added :)"
                type='success'
                time={3000}
            />) 
        }).catch((error) => {
            setAlert("sorry, somthing went wrong, please try again later")
            console.log("error in function POST_EmergancyPhoneNumber" + error);
          })
            
        }

    }


    useEffect(() => {
        //get phone number
        getPhone();
    }, [userDetails]);

    //todo clear alert when emergency call is update in setting page
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Header
                title='Emergency Call'
                logo_image='panic'
                flex={alert?0.25:0.15}
                // image_width={25}
                // image_heigt={100}
                // image_margin={{ Bottom: -4 }}
                possiton={29}
                marginLeft={12}
            />
            <Button
                // text='Panic Button'
                element={<Feather style={{ opacity: 0.85, width: '100%', alignSelf: 'flex-start' }} name="phone-call" size={105} color="white" />}
                justifyContent='flex-start'
                radius={1000}
                width={16}
                height={16}
                textSize={30}
                alignItems='center'
                color='#ff9900'
                onPress={EmergancyCall}
            />
            {!alert&&<Text style={{flex:0.3,alignSelf:'center',fontSize:20}}>Tap for emergancy call</Text>}
            {alertTool&&alertTool}
            {alert && <View style={styles.alert_Container}>
                <View style={styles.alert}>
                    <Ionicons name="alert-circle-outline" size={28} color="black" />
                    <Text style={styles.alertText}>
                        {alert}</Text>                        
                </View>
                <View style={{flex:0.6,marginTop:'5%'}}> 
                <Input 
                 label='You can add emergancy phone num here:'
                 keyboardType='number-pad'
                 getValue={(value) => setNewPhone(value)}
                 />
                 <Button
                 alignItems='center'
                 text='Add'
                 onPress={()=> saveNumber()}
                 />
                 </View>
            </View>}

        </View> 
   </TouchableWithoutFeedback>
</KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    alertText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    alert: {
        alignItems: 'center',
        borderColor: '#ff9900',
        position: 'relative',
        borderRadius: 20,
        borderWidth: 4,
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: '2%',
        flex:0.3
    },
    alert_Container: {
        bottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        flex:1
    }

})