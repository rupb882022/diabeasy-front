import { View, Text, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Button from './Button';
export default function PopUp(props) {

    const { show, setShow, width, height, button_width = 15, button_height = 3, button_textSize = 17, padding, title, title_size,element } = props

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView(width, height, padding)}>
                        <Text style={styles.title(title_size)}>{title}</Text>
                        {/* the element that will show in pop up */}
                        {element}
                        <Button
                            text='OK'
                            width={button_width}
                            height={button_height}
                            textSize={button_textSize}
                            onPress={() => { setShow(false); }}
                            justifyContent='flex-end'
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: (width = 75, height = 40, padding = 5) => {
        return {
            backgroundColor: "white",
            borderRadius: 20,
            padding: padding + '%',
            width: width + '%',
            height: height + '%',
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        }
    },
    title: (title_size=20) => {
        return {
            fontSize:title_size
        }
    }
});