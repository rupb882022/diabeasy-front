import { StyleSheet, Text, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CameraUse from './CameraUse';


const PickerMenu = React.forwardRef(({},ref)=>{
const options =[
{name:"Take from camera",icon : '' ,onPress:()=>{} },
{name:"Choose from gallery",icon : '', onPress:()=>{} }
]
return(
  <RBSheet
          ref={ref}
          height={230}
          openDuration={250}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopRightRadius:20,
              borderTopLeftRadius:20,
              alignItems: "center",
              paddingTop:15
            }
          }}
        >
          <View style={styles.warpMenu}>
          {options.map(({name,onPress,icon})=>
          <TouchableOpacity onPress={onPress} style={styles.pickOption} key={name}>
            
            <Text style={styles.text}>{icon}{name}</Text>

          </TouchableOpacity>
          
          )}
          </View>
        </RBSheet>
)

})


export default PickerMenu;

const styles = StyleSheet.create({
pickOption:{flexDirection: "row",
paddingTop:30},
warpMenu:{paddingHorizontal:20},
text:{fontSize:25}
});
