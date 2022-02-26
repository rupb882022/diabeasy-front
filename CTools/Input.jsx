import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import PopUp from './PopUp'
import DatePikcer from './DatePikcer';
import Moment from 'moment';
import SelectBox from './SelectBox';

export default function Input(props) {

    const { placeholder, secure = false, required = false, editable = true, textAlign = 'left', label, validtion, min = 0, max, alignItems, justifyContent, width, height, fontSize,
        keyboardType = 'default', type = '', selectBox_items = [], SelectBox_placeholder, mode = 'datetime', display = 'spinner', popup_title, date_format_hour = true,
        getValue,spellCheck=false,setValue,validLable } = props

      

    const [text, setText] = useState();
    const [valid_lable, setValid_lable] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectBox, setSelectBox] = useState([]);
    //for spicel valid lable that came outside of component
  



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
                setValid_lable("   Password does not match!")
                break;
            default:
                break;
        }
        text == '' && required ? setValid_lable("   please fill in some value") : '';
    }

    //if date picker 
    const onPress = () => {
        switch (type) {
            case 'date':
                setShowPopUp(true);
                break;
            case 'selectBox':
                setSelectBox(selectBox_items)
                break;
            default:
                break;
        }
    }
    //get the text from input to outside component
    useEffect(() => {
        validLable?setValid_lable(validLable):setValid_lable('')
        getValue && getValue(text);
    }, [text,validLable]);

        //set the text from outside component at the first time in input
        useEffect(() => {
            setValue&&setText(setValue)
        }, []);
    return (
        <View style={styles.possition(justifyContent, alignItems)}>
            <Text style={styles.label(width)}>{label}</Text>
            <TextInput
                style={styles.input(width, fontSize, height)}
                placeholder={placeholder}
                textAlign={textAlign}
                value={text}
                secureTextEntry={secure} //hide with bollet- for passwords
                onChangeText={value => { setText(value); setValid_lable(''); }}
                onBlur={checkTextInput}
                onPressIn={onPress}
                textAlignVertical='top'
                editable={editable} //disable clikc
                clearButtonMode='while-editing'    //'never', 'while-editing', 'unless-editing', 'always'
                keyboardType={keyboardType}             //'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password'


            // maxLength={10}  max lengh of the text, char=1
            // placeholderTextColor='red'
            spellCheck={spellCheck}         //If false, disables spell-check style (i.e. red underlines). The default value is inherited from autoCorrect
            // inlineImageLeft='search_icon'
            // inlineImagePadding={icon_padding}
            />

            {/* validtion label */}
            <Text style={styles.valid_lable}>{valid_lable}</Text>

            {/* pop up for date picker if type=date */}
            {showPopUp ?
                <PopUp
                    show={showPopUp}
                    title={popup_title}
                    setShow={(val) => setShowPopUp(val)}
                    element={
                        <DatePikcer
                            mode={mode}
                            display={display}
                            justifyContent='flex-start'
                            height={230}
                            width={270}
                            min={min}
                            max={new Date()}
                            setdate={date_format_hour ?
                                (value) => { setText(Moment(value).format('DD/MM/YYYY H:mm')) } :
                                (value) => { setText(Moment(value).format('DD/MM/YYYY')) }
                            }
                        />
                    }
                /> : <></>}
            {selectBox.length > 0 ?
                <SelectBox
                    placeholder={SelectBox_placeholder}
                    onSelect={(value) => { setText(value) }}
                    items={selectBox_items}
                />
                : <></>}
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
    input: (width = 75, fontSize = 16, height = 40) => {
        return {
            // borderWidth: 1,
            backgroundColor: 'white',
            width: width + '%',
            height: height + '%',
            borderRadius: 5,
            fontSize: fontSize,
            padding: '2%',
        }
    },
    label: (width = 75) => {
        return {
            width: width + '%',
            paddingBottom: '1%',
        }
    },
    valid_lable: {
        width: '80%',
        paddingTop: '1%',
        fontSize: 16,
        color: '#ff9000',
        fontWeight: 'bold',
    }
});
