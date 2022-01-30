import { View, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Moment from 'moment';


export default function InsertData(props) {

    //for date time placeholder
    const today = new Date();

    return (
        <View style={styles.container}>
            <Header
                title='Insert Data'
                logo_image='infusion'
                image_width={35}
                image_heigt={95}
                image_padding={50}
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
                    {itemKey:0, label: 'Arm', value: 'Arm' },
                    {itemKey:1, label: 'Belly', value: 'Belly' },
                    {itemKey:2, label: 'Leg', value: 'Leg' },
                ]} />
            <Input
                label='category' />
            <Input
                label='Date time' />
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
});