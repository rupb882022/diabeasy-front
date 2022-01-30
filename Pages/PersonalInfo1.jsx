import { View, StyleSheet,Text,TouchableOpacity } from 'react-native';
import React,{useState,useRef} from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import PickerMenu from './ImagePicker/PickerMenu';

export default function PersonalInfo1(props,{navigation}) {
  const sheetRef= useRef(null);
//close menu picture picker
  const closeSheet = ()=>{
  if(sheetRef.current){
    sheetRef.current.close();
  }
};
//open menu picture picker
const openSheet = ()=>{
  if(sheetRef.current){
    sheetRef.current.open();
  }
};
    return (
        <View style={styles.container}>
            <Header
                title='Personal Info'  
            />
            <Input
                label='Name'
                validtion='letters' />
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
                    {itemKey:0, label: 'Male', value: 'Male' },
                    {itemKey:1, label: 'Female', value: 'Female' },
                    {itemKey:2, label: 'Other', value: 'Other' },
                ]} />

                <Input
                label='Date Of Birth '
                type='date'
                editable={false}          
                mode='date' 
                display='spinner'
                date_format_hour={false}
                
            />
                

        <View style={styles.uploadbutton}>
        <Text>Upload Profile Picture</Text>
       
        <Button 
        logo_image='gallery'
        width={8}
        height={5}
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
        <PickerMenu ref={sheetRef}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
            
    },
    Next:{
           flex:1,           
           alignItems:'flex-end',
    },
    txt:{paddingRight:'13%'},
    uploadbutton: {flex:1,           
      paddingLeft:50},
});