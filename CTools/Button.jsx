import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


export default function Button(props) {

    const { element,text, onPress, width, height, radius, textSize, justifyContent, alignItems,color } = props


  
    return (
        <View style={styles.possition(justifyContent, alignItems)}>
            <TouchableOpacity
                onPress={onPress}
       
                style={styles.button(width, height, radius,color)}
            >
             
                {element? element:<></>}

                {text?<Text
                style={styles.btntext(textSize)}
                >{text}
                </Text>:<></>}
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    possition: (justifyContent = '', alignItems = '') => {
        return {
            flex: 1,
            justifyContent: justifyContent,
            alignItems: alignItems,
        }
    },
    //generic bottom style
    button: (size = 15, height = 4, radius = 30,color='#1ea6d6') => {
        return {
            borderWidth: 1,
            borderRadius: radius,
            backgroundColor: color,
            paddingTop: height + '%',
            paddingBottom: height + '%',
            paddingRight: size + '%',
            paddingLeft: size + '%',
            borderColor: 'white',
        }
    },
    btntext: (textSize = 18) => {
        return {
            color: 'white',
            fontSize: textSize,
        }
    },
    logo: ( logoHeight= 40, logoWidth=40)=>{
        return{
            height:logoHeight,
            width:logoWidth,   
        }
    }
    
});