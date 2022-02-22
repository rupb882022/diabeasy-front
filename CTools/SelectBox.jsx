import { View } from 'react-native'
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function SelectBox(props) {
    const { items, onSelect,placeholder } = props
    if(items.length>0){
    return (
        <View style={{ flex: 1, width: '200%', position: 'absolute', right: '10%',top:'42%' }}>
            <RNPickerSelect
                onValueChange={(value) => { onSelect(value) }}
                items={items}
                placeholder = {{ 
                    label: placeholder, 
                    value: null, 
                    color: 'grey' 
                  }}
            />
        </View>
    );}else{
        return(<></>);
    }
}
