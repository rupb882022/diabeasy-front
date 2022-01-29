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
            />
            <Input
                label='Date time'
                type='date'
                editable={false}
                placeholder={"  "+Moment(today).format("DD/MM/YYYY H:mm")}
            />
            <Input
                label='Blood sugar level'
                validtion='number'
                keyboardType='numeric' />
            <Input
                label='spot of injection'
                validtion='letters' />
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