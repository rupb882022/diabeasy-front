import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PatientLogin(props) {
    return (
        <View style={styles.container}>
            <Header
                title='Login'
                logo_image='diabeasy'
                image_width={100}
                flexDirection="column-reverse"
                alignItems='center'
                paddingRight={25}
                justifyContent='flex-end'
                line={false}
            />
            <View style={styles.inputs}>
                <Input
                    label='Email'
                    keyboardType='email-address'
                    justifyContent='flex-end'

                />

                <Input
                    label='Password'
                    secure={true}
                    justifyContent='flex-start'
                // height={}
                //width={}
                />
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
                <Text >Forgot Password?</Text>
            </TouchableOpacity>

            <Button
                text="LogIn"
                width={20}
                height={4}
                alignItems='center'
                justifyContent='flex-end'

            />

            <Image
                style={styles.Image}
                source={require('../images/home_img.webp.png')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    Image: {
        height: '25%',
        resizeMode: 'cover',
        width: '50%',
        alignSelf: 'center',
        opacity: 0.95,
        marginBottom: '1%'
    },
    forgotPassword: {
        alignItems: 'flex-end',
        paddingRight: '12%',
        justifyContent: 'flex-start'
    },
    inputs: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});