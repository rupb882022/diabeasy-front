import { View } from 'react-native'
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function SelectBox(props) {
    const { items, onSelect } = props
    return (
        <View style={{ flex: 0, width: '200%', position: 'absolute', right: '10%' }}>
            <RNPickerSelect
                onValueChange={(value) => { onSelect(value) }}
                items={items}
                placeholder = {{ 
                    label: 'select spot of injection', 
                    value: null, 
                    color: 'grey' 
                  }}
            />
        </View>
    );
}
