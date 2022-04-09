import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useContext,useEffect } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Moment from 'moment';
import { UserContext } from '../CTools/UserDetailsHook'
import Loading from '../CTools/Loading';
import {Post_user_data} from '../Functions/Function'
import Alert from '../CTools/Alert';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { flushSync } from 'react-dom'

export default function InsertData({ navigation, route }) {

    //for date time placeholder
    const today = new Date();
    let FoodDetails = route.params && route.params.myFoodDtails ? route.params.myFoodDtails : '';   

    const { userDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState()
    const [dateTime, setDateTime] = useState(today);
    const [sugarLevel, setsugarLevel] = useState();
    const [spot, setSpot] = useState();
    const [carbs, setCarbs] = useState();
    const [injectionValue, setinjectionValue] = useState();
    const [foodLibary, setFoodLibary] = useState(FoodDetails);

    const save_details = () => {
        if (sugarLevel) {
            setLoading(true)
            let injectionType = carbs ? 'food' : injectionValue ? 'fix' : 'no-injection'

            let date = Moment(dateTime).format("MM/DD/YYYY H:mm");

            let detials = {
                date_time: date,
                blood_sugar_level: sugarLevel,
                injection_site: spot,
                totalCarbs: carbs,
                injectionType: injectionType,
                value_of_ingection: injectionValue,
                Patients_id: userDetails.id,
                foodLibary:foodLibary
            }

            Post_user_data(detials).then((response) => {
                    setLoading(false)
                    if (response) {
                        setAlert(
                            <Alert
                                text="details Save!"
                                type='success'
                            />)
                    } 
                })
                .catch((error) => {
                    setAlert(
                        <Alert text="sorry somting is got wotng try agine later"
                            type='worng'
                        />)
                        console.log("error in function Post_user_details "+error);
                    setLoading(false)
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
            setFoodLibary(FoodDetails)
            console.log(foodLibary);
      }))

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            {alert && alert}
            <Header
                title='Insert Data'
                logo_image='infusion'
                image_width={30}
                image_heigt={125}
                possiton={48}
                marginLeft={2}
                image_margin={{ Bottom: -5 }}
            />
            <Text style={styles.eatText}>Are you going to eat?</Text>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={{ flex: 4, paddingLeft: '13%' }}>
                    <Input
                        label='grams of carbohydrates'
                        validtion='number'
                        width={100}
                        justifyContent='flex-start'
                        // keyboardType='decimal-pad'
                        setValue={carbs ? carbs : ''}
                        getValue={(value) => setCarbs(value)}
                    />
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
                keyboardType='numeric'
                max={600}
                required={true}
                getValue={(value) => setsugarLevel(value)}
            />
            <Input
                label='injection value'
                validtion='number'
                // keyboardType='decimal-pad'

                getValue={(value) => setinjectionValue(value)}
            />
            <Input
                label='spot of injection'
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
                popup_title='choose date and time'
                label='Date time'
                type='date'
                editable={false}
                placeholder={"  " + Moment(today).format("DD/MM/YYYY H:mm")}
                getValue={(value) => setDateTime(value)}
            />
            <Button
                text="save"
                width={10}
                height={2}
                alignItems='center'
                justifyContent='flex-start'
                onPress={() => save_details()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    eatText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%'

    }
});