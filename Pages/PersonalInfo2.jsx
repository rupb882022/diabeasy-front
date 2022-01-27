import { View, StyleSheet,Text } from 'react-native';
import React from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';

export default function PersonalInfo2(props) {
    return (
        <View style={styles.container}>
            <Header
                title='Medical Info'  
            />
            <Input
                label='Weight'
                validtion='number'
                keyboardType='numeric' 
                placeholder='  kg'/>
            <Input
            label='Height'
            validtion='number'
            keyboardType='numeric'
            placeholder='  cm'
                 />
                 <Input
                label='Insulin Type'
                />

            <Input
                label='Boules Value' />
            <Input
                label='Injection Spot' />

            <Input
                label='Emergency Contact Phone Number'
                validtion='number'
                keyboardType='numeric'/>

            <Input
                label='Add Your Doctor By Email'
                keyboardType='email-address' />

      
     {/* Register Page Button */}
     <View style={styles.Register}>
     <Text style={styles.txt}> 2/2</Text>
            <Button
            text="Register"
            width={8}
            height={2}
            justifyContent='flex-start'
            />
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',     
    },
    Register:{
           flex:1,           
           alignItems:'flex-end',
    },
    txt:{paddingRight:'15%'},
 
});