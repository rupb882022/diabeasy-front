import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useContext } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Moment from 'moment';
import { UserContext } from '../CTools/UserDetailsHook'
import axios from "axios";
import Loading from '../CTools/Loading';
import apiUrl from '../Routes/Url'
import Alert from '../CTools/Alert';

export default function InsertData({ navigation }) {             //TO DO - Go back Icon

    //for date time placeholder
    const today = new Date();

    const { userDetails } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState()
    const [dateTime, setDateTime] = useState(today);
    const [sugarLevel, setsugarLevel] = useState();
    const [spot, setSpot] = useState();
    const [carbs, setCarbs] = useState();
    const [injectionValue, setinjectionValue] = useState();

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
                Patients_id: userDetails.id
            }


            const configurationObject = {
                url: apiUrl + 'User/InsertData',
                method: "POST",
                data: detials
            };
            axios(configurationObject)
                .then((response) => {
                    setLoading(false)
                    if (response.status === 201) {
                        setAlert(
                            <Alert 
                            text="details Save!"
                            type='success'
                            />)
                    } else {
                        throw new Error("An error has occurred");
                    }
                })
                .catch((error) => {
                    setAlert(
                        <Alert text="sorry somting is got wotng try agine later"
                        type='worng'
                        />)
                        console.log(error.response.data);
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

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            {alert&&alert}
            <Header
                title='Insert Data'
                logo_image='infusion'
                image_width={30}
                image_heigt={125}
                possiton={48}
                marginLeft={2}
                image_margin={{ Bottom: -5 }}
            />

            <Input
                popup_title='choose date and time'
                label='Date time'
                type='date'
                editable={false}
                placeholder={"  " + Moment(today).format("DD/MM/YYYY H:mm")}
                getValue={(value) => setDateTime(value)}
            />
            <Input
                label='Blood sugar level'
                validtion='number'
                keyboardType='numeric'
                max={600}
                required={true}
                getValue={(value) => setsugarLevel(value)}
            />
            <View style={{ flex: 1, flexDirection: 'row', width: '88%', alignSelf: 'center' }}>
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
                    label='injection value'
                    validtion='number'
                    keyboardType='decimal-pad'
                    max={600}
                    getValue={(value) => setinjectionValue(value)}
                />
            </View>
            <Text style={styles.eatText}>Are you going to eat?</Text>
            <Input
                label='grams of carbohydrates'
                validtion='number'
                keyboardType='decimal-pad'
                getValue={(value) => setCarbs(value)}
            />
            <View style={{ flex: 1, marginRight: '10%' }}>
                <Button
                    text="food library"
                    width={5}
                    onPress={() => navigation.navigate('Food')}
                    height={2}
                    alignItems='flex-end'
                    justifyContent='flex-start'
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
        fontWeight: 'bold'
    }
});