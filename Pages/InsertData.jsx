import { View, StyleSheet, ScrollView, Switch, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import moment from 'moment';
import { UserContext } from '../CTools/UserDetailsHook'
import Loading from '../CTools/Loading';
import { Post_user_data, Post_SendPushNotification, GetInjectionRecommend } from '../Functions/Function'
import Alert from '../CTools/Alert';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Get_all_ExceptionalEvent,get_food_for_hipo } from '../Functions/Function'
import MultiSelectInput from '../CTools/MultiSelectInput'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InsertData({ navigation, route }) {

    //for date time placeholder
    const today = new Date();
    let FoodDetails = route.params && route.params.myFoodDtails ? route.params.myFoodDtails : '';

    const { userDetails, setUserDetails } = useContext(UserContext);
    const [alert, setAlert] = useState()
    const [dateTime, setDateTime] = useState();
    const [sugarLevel, setsugarLevel] = useState();
    const [spot, setSpot] = useState();
    const [listExceptionalEvent, setListExceptionalEvent] = useState();
    const [ExceptionalEvent, setExceptionalEvent] = useState(null);
    const [carbs, setCarbs] = useState('');
    const [valid_lable, setValid_lable] = useState('');
    const [injectionValue, setinjectionValue] = useState();
    const [foodLibary, setFoodLibary] = useState(FoodDetails);
    const [defualtSpot, setDefualtSpot] = useState()
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState();
    // const [keyboardStatus, setKeyboardStatus] = useState(undefined);


    useEffect(() => {
        userDetails && userDetails.spot ? setSpot(userDetails.spot) : '';
        userDetails && userDetails.spot ? setDefualtSpot(true) : setDefualtSpot(false);
    }, [])

    const reccomandtion = () => {
        if (!sugarLevel || !spot) {
            setAlert(
                <Alert text="suger level value and injection_site is required"
                    type='alert'
                    time={3000}
                    bottom={90}
                />)
            return;
        }
        if (sugarLevel < 75) {

             get_food_for_hipo(userDetails.id).then((resulte) => {
                if (resulte) {
                    navigation.navigate('HipoRec', { 'hipoFood': resulte })
                }
            }, (error) => {
                setAlert(
                    <Alert text={`suger level is low!\nyou can get recommandtion for Hipo food\nat the Recommandtion page`}
                        type='alert'
                        time={5000}
                        bottom={90}
                    />)
                console.log(error + " get_food_for_hipo")
            })
return;
        }
    
    if (sugarLevel >= 75 && sugarLevel <= 155 && (!carbs || carbs == 0)) {
        setAlert(
            <Alert text={`your suger level value is good \n you dont need to inject if you dont eat`}
                type='info'
                time={4000}
                bottom={90}
            />)
        return;
    }

    setLoading(true);
    let injectionType = carbs ? 'food' : 'fix'

    GetInjectionRecommend(userDetails.id, sugarLevel, injectionType).then((response) => {

        setInterval(() => setLoading(false), 2000);
        return response
    }).then((response) => {
        let data = { ...details, reccomandtion: response }
        console.log("data", data)

        if (response && (response.fix || response.food)) {
            navigation.navigate('Recommandation', { detials: data });
        } else {
            throw new Error(response);
        }

    })
        .catch((error) => {
            setLoading(false)
            setAlert(
                <Alert text="sorry you dont have enough data, try agine later"
                    type='worng'
                    bottom={90}
                />)
            console.log("error in function Post_user_details " + error);
        });
}

//for recommandtion page- becouse it pass the last var in route params and not the current var
useEffect(() => {
    let date = dateTime ? moment(dateTime, 'DD/MM/YYYY H:mm').format('YYYY-MM-DD[T]HH:mm:ss') : moment(today).format('YYYY-MM-DD[T]HH:mm:ss');
    let food = foodLibary ? foodLibary.map(x => { return { foodId: x.id, amount: x.amount, unitName: x.unit } }) : []
    let injectionType = carbs ? 'food' : 'fix'
    let detials = {
        date_time: date,
        blood_sugar_level: sugarLevel,
        injection_site: spot,
        totalCarbs: carbs ? carbs : 0,
        injectionType: injectionType,
        value_of_ingection: injectionValue,
        Patients_id: userDetails.id,
        food: food,
        ExceptionalEvent: ExceptionalEvent,
    }
    setDetails(detials)
}, [carbs, sugarLevel, spot, ExceptionalEvent, injectionValue, dateTime])

const save_details = () => {
    if (sugarLevel) {
        setLoading(true);
        let injectionType = carbs ? 'food' : injectionValue ? 'fix' : 'no-injection'

        let date = dateTime ? moment(dateTime, 'DD/MM/YYYY H:mm').format('YYYY-MM-DD[T]HH:mm:ss') : moment(today).format('YYYY-MM-DD[T]HH:mm:ss');
        let food = foodLibary ? foodLibary.map(x => { return { foodId: x.id, amount: x.amount, unitName: x.unit } }) : []
        let detials = {
            date_time: date,
            blood_sugar_level: sugarLevel,
            injection_site: injectionType === 'no-injection' ? null : spot,
            totalCarbs: carbs ? carbs : 0,
            injectionType: injectionType,
            value_of_ingection: injectionValue,
            Patients_id: userDetails.id,
            food: food,
            ExceptionalEvent: ExceptionalEvent,
        }
        let PushDetails = {
            "to": userDetails.Token,
            "title": "DiabeasyApp",
            "body": "2 Hours remaining! have you checked your blood sugar level?",
            "badge": "0",
            "ttl": "10",  // num of seconds - exept only int - write the number of sec you want that the push will wait. 
            "data": { "to": userDetails.Token }
        }
        console.log("detials", detials);
        Post_user_data(detials).then((response) => {
            setInterval(() => setLoading(false), 1000);
            return response
        }).then((response) => {
            response && navigation.navigate('Repotrs - Table');
        })
            .then(Post_SendPushNotification(PushDetails).then((res) => {
                res && console.log(" res status push notification=> ", res.status);
            }))
            .catch((error) => {
                setLoading(false)
                setAlert(
                    <Alert text="sorry somting is got wotng try agine later"
                        type='worng'
                        bottom={90}
                    />)

                console.log("error in function Post_user_details " + error);
            });

    } else {
        setAlert(
            <Alert text="suger level value is required"
                type='alert'
                time={3000}
                bottom={90}
            />)
    }
}

useFocusEffect(
    React.useCallback(() => {
        setFoodLibary(FoodDetails);
        calc_carbs();
    }))

const calc_carbs = () => {
    if (foodLibary) {
        let tempCarbs = 0;
        foodLibary.map(x => { tempCarbs += Number(x.carbs) })
        setCarbs(tempCarbs.toFixed(1))
    }
}

const checkCarbs = () => {
    let regex = /^[+-]?\d+(\.\d+)?$/;
    regex.test(carbs) ? setValid_lable('') : setValid_lable("numbers only!")
}

useEffect(() => {
    if (!listExceptionalEvent) {
        Get_all_ExceptionalEvent().then((resulte) => {
            let temp = resulte.map(x => {
                return ({ itemKey: x.id, label: x.name.replace(/(\r\n|\n|\r)/gm, ""), value: x.id })
            });
            setListExceptionalEvent(temp);
        },
            (error) => {
                console.log("error in function Get_all_ExceptionalEvent ", error)
            })
    }
}, []);

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

//set defualt spot in localstroge
useEffect(() => {
    // console.log("defualtSpot", defualtSpot)
    // console.log("spot", spot)
    // console.log("userDetails", userDetails)
    if (defualtSpot && spot && userDetails && !userDetails.spot) {
        let temp = { ...userDetails, spot: spot }
        storeData(temp)
        setUserDetails(temp)
    }

    if (!defualtSpot && userDetails && userDetails.spot) {
        delete userDetails['spot'];
        storeData(userDetails);
    }
}, [defualtSpot]);

//if user change is defualt spot
useEffect(() => {
    if (userDetails && userDetails.spot != spot && spot) {
        delete userDetails['spot'];
        let temp = { ...userDetails, spot: spot }
        storeData(temp)
        setUserDetails(temp)
    }
}, [spot])

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {loading && <Loading
                    opacity={'#d6f2fc'}
                />}
                {alert && alert}
                <Header
                    title='Insert Data'
                    logo_image='infusion'
                    image_width={30}
                    image_heigt={125}
                    possiton={ExceptionalEvent && ExceptionalEvent.length > 0 ? 28 - (ExceptionalEvent.length * 0.80) : 28}
                    flex={0.8}
                    // line={false}
                    image_margin={{ Bottom: -5 }}
                />
                {/* <SafeAreaView style={{flex:5}}> */}
                <ScrollView style={{ maxHeight: 500 }}>
                    <View style={styles.containerBody}>
                        <Text style={styles.eatText}>What are you going to eat?</Text>

                        <MultiSelectInput
                            placeholder=' Exceptional event ?'
                            data={listExceptionalEvent}
                            getValue={(value) => setExceptionalEvent(value)}
                        />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 4, paddingLeft: '13%' }}>
                                <View style={styles.CarbsinputContiner}>
                                    <Text style={styles.label}></Text>
                                    <TextInput
                                        placeholder='Carbs'
                                        keyboardType='number-pad'
                                        style={styles.Carbsinput}
                                        value={carbs ? carbs.toString() : ''}
                                        onChangeText={value => { setCarbs(value); }}
                                        clearButtonMode='while-editing'
                                        onBlur={checkCarbs}
                                    />
                                </View>
                                <Text style={styles.valid_lable}>{valid_lable}</Text>
                            </View>
                            <View style={{ flex: 1, paddingRight: '12%', paddingBottom: '4%' }}>

                                <Button
                                    // text="food library"
                                    width={15}
                                    onPress={() => navigation.navigate('Food')}
                                    height={6}
                                    radius={5}
                                    element={<Ionicons name="fast-food-outline" size={24} color='white' />}
                                    alignItems='flex-end'
                                    justifyContent='center'
                                />
                            </View>
                        </View>
                        <Input
                            placeholder='Blood sugar level'
                            validtion='number'
                            keyboardType='number-pad'
                            max={600}
                            required={true}
                            getValue={(value) => setsugarLevel(value)}
                        />
                        <Input
                            placeholder='injection value'
                            validtion='float'
                            // keyboardType='decimal-pad'
                            getValue={(value) => setinjectionValue(value)}
                        />
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1, paddingRight: '8%' }}>
                                <Input
                                    flex={1}
                                    alignItems='flex-end'
                                    width={83}
                                    placeholder={userDetails && userDetails.spot ? userDetails && userDetails.spot : 'Spot of injection'}
                                    editable={false}
                                    type='selectBox'
                                    getValue={(value) => setSpot(value)}
                                    SelectBox_placeholder={'Select spot of injection'}
                                    selectBox_items={[
                                        { itemKey: 0, label: 'Arm', value: 'Arm' },
                                        { itemKey: 1, label: 'Belly', value: 'Belly' },
                                        { itemKey: 2, label: 'Leg', value: 'Leg' },
                                        { itemKey: 3, label: 'Buttock', value: 'Buttock' },
                                    ]} />
                            </View>
                            <View style={{ position: 'relative', right: '67%' }}>
                                {/* <CheckBox
                                    getvalue={(value) => { setDefualtSpot(value) }}
                                /> */}
                                <Button
                                    // text="food library"
                                    width={4}
                                    onPress={() => { setDefualtSpot(!defualtSpot); }}
                                    height={4}
                                    radius={5}
                                    color={defualtSpot ? 'grey' : '#1ea6d6'}
                                    element={<><Text style={styles.default}>{defualtSpot ? 'unset' : 'set'}</Text>
                                        <Text style={styles.default}>defualt</Text>
                                    </>
                                        // <Ionicons name="fast-food-outline" size={24} color='white' />
                                    }
                                    alignItems='flex-end'
                                    justifyContent='center'
                                />
                            </View>
                        </View>
                        <Input
                            popup_title='Choose date and time'
                            // label='Date time'
                            type='date'
                            editable={false}
                            placeholder={" Date time: " + moment(today).format("DD/MM/YYYY H:mm")}
                            getValue={(value) => setDateTime(value)}
                        />
                    </View>
                </ScrollView>
                {/* </SafeAreaView> */}
                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '5%' }}>
                    <Button
                        flex={1}
                        text="save"
                        width={23}
                        height={2}
                        alignItems='center'
                        justifyContent='flex-start'
                        onPress={() => save_details()}
                    />
                    <Button
                        flex={1}
                        text="reccomandtion"
                        width={5}
                        height={2}
                        alignItems='flex-start'
                        justifyContent='flex-start'
                        onPress={() => reccomandtion()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerBody: {
        flex: 6.5,
        // bottom: '4%',

    },
    eatText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%'

    },
    Carbsinput: {
        backgroundColor: 'white',
        width: '100%',
        height: '72%',
        borderRadius: 5,
        fontSize: 14,
        padding: '2%',
        shadowOffset: {
            width: -1,
            height: 1
        },
        bottom: '25%',
        shadowColor: '#727272',
        shadowOpacity: 1,
        justifyContent: 'center',
        textAlign: 'left'
    }, CarbsinputContiner: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }, label: {
        // flex:1,
        width: '75%',
        paddingBottom: '1%',
    }, valid_lable: {
        width: '75%',
        bottom: '15%',
        fontSize: 14,
        color: '#ff9000',
    },
    switch: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: '2%',
    },
    default: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        flexWrap: 'wrap'
    }
});


