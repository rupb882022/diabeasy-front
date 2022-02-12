import { View, StyleSheet, Text } from 'react-native';
import React,{useState} from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Moment from 'moment';
import PopUp from '../CTools/PopUp';
import FoodLibrary from './Food/FoodLibrary';

export default function InsertData({navigation}) {

    //for date time placeholder
    const today = new Date();
    //pop up food
    const [show, setShow] = useState(false);
    return (
        <View style={styles.container}>

            <Header
                title='Insert Data'
                logo_image='infusion'
                image_width={30}
                image_heigt={125}
                possiton={55}
                marginLeft={2}
                image_margin={{ Bottom: -5 }}
            />

            <Input
                popup_title='choose date and time'
                label='Date time'
                type='date'
                editable={false}
                placeholder={"  " + Moment(today).format("DD/MM/YYYY H:mm")}
            />
            <Input
                label='Blood sugar level'
                validtion='number'
                keyboardType='decimal-pad'
                max={600}
                required={true}
            />
            <Input
                label='spot of injection'
                editable={false}
                type='selectBox'
                SelectBox_placeholder='Select spot of injection'
                selectBox_items={[
                    { itemKey: 0, label: 'Arm', value: 'Arm' },
                    { itemKey: 1, label: 'Belly', value: 'Belly' },
                    { itemKey: 2, label: 'Leg', value: 'Leg' },
                ]} />
            <Text style={styles.eatText}>Are you going to eat?</Text>
            <Input
                label='grams of carbohydrates'
                validtion='number'
                keyboardType='decimal-pad'
            />
            <View style={{flex:1,marginRight:'10%'}}>
            <Button
                text="food library"
                width={5}
                onPress={()=>{setShow(true)}}
                height={2}
                alignItems='flex-end'
                justifyContent='flex-start'
            />
            </View>
            {show?
            <PopUp
            width={100}
            backgroundColor='#40C5CA'
            height={95}
            setShow={setShow}
            element={<FoodLibrary/>}
            />:<></>}
            <Button
                text="save"
                width={10}
                height={2}
                alignItems='center'
                justifyContent='flex-start'
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