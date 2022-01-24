import { View, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';

export default function InsertData(props) {
    return (
        <View style={styles.container}>
            <Header
                title='Insert Data'  
            />
            <Input
                label='Date time' />
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