import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import moment from 'moment';
import { UserContext } from '../CTools/UserDetailsHook'
import Loading from '../CTools/Loading';
import { Post_user_data } from '../Functions/Function'
import Alert from '../CTools/Alert';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


export default function InsertData({ navigation, route }) {

    //for date time placeholder
    const today = new Date();
    let FoodDetails = route.params && route.params.myFoodDtails ? route.params.myFoodDtails : '';

    const { userDetails } = useContext(UserContext);
    const [alert, setAlert] = useState()
    const [dateTime, setDateTime] = useState();
    const [sugarLevel, setsugarLevel] = useState();
    const [spot, setSpot] = useState();
    const [carbs, setCarbs] = useState('');
    const [valid_lable, setValid_lable] = useState('');
    const [injectionValue, setinjectionValue] = useState();
    const [foodLibary, setFoodLibary] = useState(FoodDetails);


    const save_details = () => {
        if (sugarLevel) {
            let injectionType = carbs ? 'food' : injectionValue ? 'fix' : 'no-injection'

            let date = dateTime ? moment(dateTime, 'DD/MM/YYYY H:mm').format('YYYY-MM-DD[T]HH:mm:ss') : moment(today).format('YYYY-MM-DD[T]HH:mm:ss');
            let food = foodLibary?foodLibary.map(x => {return { foodId: x.id, amount: x.amount, unitName: x.unit }}):[]
            let detials = {
                date_time: date,
                blood_sugar_level: sugarLevel,
                injection_site: spot,
                totalCarbs: carbs ? carbs : 0,
                injectionType: injectionType,
                value_of_ingection: injectionValue,
                Patients_id: userDetails.id,
                food: food
            }
            console.log("detials", detials);
            Post_user_data(detials).then((response) => {
                response && navigation.navigate('Repotrs - Table');
            })
                .catch((error) => {
                    setAlert(
                        <Alert text="sorry somting is got wotng try agine later"
                            type='worng'
                        />)
                    console.log("error in function Post_user_details " + error);
                });

        } else {
            setAlert(
                <Alert text="suger level value is required"
                    type='alert'
                    time={3000}
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
        regex.test(carbs) ? setValid_lable('') : setValid_lable("digits only!")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {alert && alert}
                    <Header
                        title='Insert Data'
                        logo_image='infusion'
                        image_width={30}
                        image_heigt={125}
                        possiton={68}
                        flex={1.5}
                        marginLeft={2}
                        image_margin={{ Bottom: -5 }}
                    />
                    <View style={styles.containerBody}>
                        <Text style={styles.eatText}>What are you going to eat?</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 4, paddingLeft: '13%' }}>
                                <View style={styles.CarbsinputContiner}>
                                    <Text style={styles.label}>Carbs</Text>
                                    <TextInput
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
                            label='Blood sugar level'
                            validtion='number'
                            keyboardType='number-pad'
                            max={600}
                            required={true}
                            getValue={(value) => setsugarLevel(value)}
                        />
                        <Input
                            label='injection value'
                            validtion='float'
                            // keyboardType='decimal-pad'
                            getValue={(value) => setinjectionValue(value)}
                        />
                        <Input
                            label='Spot of injection'
                            editable={false}
                            type='selectBox'
                            getValue={(value) => setSpot(value)}
                            SelectBox_placeholder='Select spot of injection'
                            selectBox_items={[
                                { itemKey: 0, label: 'Arm', value: 'Arm' },
                                { itemKey: 1, label: 'Belly', value: 'Belly' },
                                { itemKey: 2, label: 'Leg', value: 'Leg' },
                                { itemKey: 3, label: 'Buttock', value: 'Buttock' },
                            ]} />
                        <Input
                            popup_title='Choose date and time'
                            label='Date time'
                            type='date'
                            editable={false}
                            placeholder={"  " + moment(today).format("DD/MM/YYYY H:mm")}
                            getValue={(value) => setDateTime(value)}
                        />
                    </View>
                    <Button
                        text="save"
                        width={10}
                        height={2}
                        alignItems='center'
                        justifyContent='flex-start'
                        onPress={() => save_details()}
                    />
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
        bottom: '4%',

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
        height: '48%',
        borderRadius: 5,
        fontSize: 14,
        padding: '2%',
        shadowOffset: {
            width: -1,
            height: 1
        },
        shadowColor: '#727272',
        shadowOpacity: 1,
        justifyContent: 'center'
    }, CarbsinputContiner: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }, label: {
        width: '75%',
        paddingBottom: '1%',
    }, valid_lable: {
        width: '75%',
        bottom: '15%',
        fontSize: 14,
        color: '#ff9000',
    }
});