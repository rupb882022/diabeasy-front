import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


export default function Button(props) {

    const { btntext, onPress, withe, heigth, radios, textSize,justifyContent,alignItems } = props

    return (
        <View style={styles.possition(justifyContent,alignItems)}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.button(withe, heigth, radios)}
            >
                <Text
                    style={styles.btntext(textSize)}
                >{btntext}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    possition: (justifyContent='center',alignItems='center')=> {
       return{ flex: 1,
        justifyContent: justifyContent,
        alignItems: alignItems,
    }
    },
    //generic bottom style
    button: (size = 15, heigth = 4, radios = 30) => {
        return {
            borderWidth: 1,
            borderRadius: radios,
            backgroundColor: '#1ea6d6',
            paddingTop: heigth + '%',
            paddingBottom: heigth + '%',
            paddingRight: size + '%',
            paddingLeft: size + '%',
            borderColor: 'white',
        }
    },
    btntext: (textSize=18) => {
        return {
            color: 'white',
            fontSize: textSize,
        }
    }
});