import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function Input(props) {

    const { placeholder, secure = false, textAlign = 'left', label, validtion, min = 0, max, alignItems, justifyContent,width,fontSize } = props
    const [text, setText] = useState('');
    const [valid_lable, setValid_lable] = useState('');

    //if props validtion
    const checkTextInput = () => {
        let regex = '';
        switch (validtion) {
            case 'number':
                regex = /^[0-9\b]+$/;
                regex.test(text) ? "" : setValid_lable("digits only!");
                //if props max
                if (max) {
                    text >= min && text <= max ? "" : setValid_lable(`digits only! need to be bettwen ${min} to ${max}`);
                }
                break;
            case 'letters':
                regex = /^[a-zA-z]+$/;
                regex.test(text) ? "" : setValid_lable("English letters only!");
                break;
            case 'Password':
                break;
            default:
                break;
        }
    }
    return (
        <View style={styles.possition(justifyContent, alignItems)}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input(width,fontSize)}
                placeholder={placeholder}
                textAlign={textAlign}
                secureTextEntry={secure} //hide with bollet- for passwords
                onChangeText={text => { setText(text); setValid_lable(''); }}
                onBlur={checkTextInput}
                textAlignVertical='top'
                clearButtonMode='while-editing'    //'never', 'while-editing', 'unless-editing', 'always'
                keyboardType='default'             //'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password'
            // maxLength={10}  max lengh of the text, char=1
            // placeholderTextColor='red'
            // spellCheck={true/false}         If false, disables spell-check style (i.e. red underlines). The default value is inherited from autoCorrect
            // inlineImageLeft='search_icon'
            // inlineImagePadding={icon_padding}
            />
            <Text style={styles.valid_lable}>{valid_lable}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    possition: (justifyContent = 'center', alignItems = 'center') => {
        return {
            flex: 1,
            justifyContent: justifyContent,
            alignItems: alignItems,
        }
    },
    input: (width=80,fontSize=16)=> {
        return {
        // borderWidth: 1,
        backgroundColor: 'white',
        width: width+'%',
        height: '5%',
        borderRadius: 5,
        fontSize: fontSize
    }
    },
    label: {
        width: '80%',
        paddingBottom: '1%'
    },
    valid_lable: {
        width: '80%',
        paddingTop: '1%',
        fontSize: 16,
        color: 'red',
    }
});
