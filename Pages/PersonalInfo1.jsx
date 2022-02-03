import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import PickerMenu from './ImagePicker/PickerMenu';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function PersonalInfo1(props, { navigation }) {
    const sheetRef = useRef(null);
    //close menu picture picker
    const closeSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.close();
        }
    };
    //open menu picture picker
    const openSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.open();
        }
    };
    return (
        <View style={styles.container}>
            <Header
                title='Personal Info'
                possiton={0}
                marginLeft={4}
                line={false}
            />
            <Input
                label='Name'
                validtion='letters' />
                {/* TODO validtion all inputs */}
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
                label='Gender'
                editable={false}
                type='selectBox'
                SelectBox_placeholder='Gender'
                selectBox_items={[
                    { itemKey: 0, label: 'Male', value: 'Male' },
                    { itemKey: 1, label: 'Female', value: 'Female' },
                    { itemKey: 2, label: 'Other', value: 'Other' },
                ]} />

            <Input
                popup_title='Your Birth Date'
                label='Date Of Birth '
                type='date'
                mode='date'
                min={new Date(1920,1,1)}
                editable={false}
                display='spinner'
                date_format_hour={false}

            />


            <View style={styles.uploadbutton}>
                <Text>Upload Profile Picture</Text>

                <Button
                   //element={<Image source={require('../images/icons/addPhotoIcon.png')} style={styles.logo} />}
                   //element={<Image source={require('../images/icons/gallery.JPG.png')} style={styles.logo} />}
                   element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />} 
                    width={5}
                    height={3}
                    onPress={openSheet}

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
            <PickerMenu ref={sheetRef} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    Next: {
        flex: 1,
        alignItems: 'flex-end',
    },
    txt: { paddingRight: '13%' },
    uploadbutton: {
        flex: 1,
        paddingLeft: 50
    },
    logo: {width:40 , height: 40 }

});