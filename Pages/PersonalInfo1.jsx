import { View, StyleSheet,Text } from 'react-native';
import React from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';

export default function PersonalInfo1(props) {
    return (
        <View style={styles.container}>
            <Header
                title='Personal Info'  
            />
            <Input
                label='Name'
                validtion='letters' />
            <Input
                label='Email'
                keyboardType='email-address' />
            <Input
                label='Password'
                secure={true}
                 />
  {/* Optional :
               <Input
                label='Confirm Password'
                secure={true}/>*/}

            <Input
                label='Gender' />

                
                
            <Input
                label='Date Of Birth' />

        <View style={styles.uploadbutton}>
        <Text>Upload Profile Picture </Text>
        <Button 
        text='+'
        width={8}
        height={5}
        />
      </View>
     {/* Next Page Button */}
     <View style={styles.Next}>
     <Text style={styles.txt}> 1/2</Text>
            <Button
            text="Next"
            width={10}
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
    Next:{
           flex:1,           
           alignItems:'flex-end',
    },
    txt:{paddingRight:'13%'},
    uploadbutton: {flex:1,           
      paddingLeft:50}
});