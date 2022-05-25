import { View, Switch,Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import React,{useContext, useState} from 'react';
import {UserContext} from '../CTools/UserDetailsHook'
import { AntDesign } from '@expo/vector-icons'; 
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import { ScrollView } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';

export default function Setting({navigation}) {
const [openDiv,setOpenDiv]=useState(false)
const [afterFood,setAfterfood]=useState(false)
const [eightHours,setEightHours]=useState(false)
const [highValue,setHighValue]=useState(false)
const [afterPanicButton,setAfterPanicButton]=useState(false)
//const [forgotPassword,setForgotPassword]=useState(false)
const [show, setShow] = useState(false);

// אחרי שעתיים של הזנת מזון, מעל שמונה שעות שלא הזין, ערך סוכר גבוהה מעל 200 מעל 24 שעות, שעתתים לאחר לחצן מצוקה

const element = <View style={{backgroundColor:'#bbe4f2'}}>
 <View style={{flexDirection:'row',marginBottom:'2%'}}>
   <Text style={{marginRight:'33%'}}> Two hours after eating </Text>
<Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={afterFood ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setAfterfood(!afterFood) }}
                    value={afterFood}
                />

</View>
<View style={{flexDirection:'row',marginBottom:'2%'}}>
   <Text style={{marginRight:'15%'}}> Above 8 hours without insert data </Text>
<Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={eightHours ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setEightHours(!eightHours) }}
                    value={eightHours}
                />

</View>
<View style={{flexDirection:'row',marginBottom:'2%'}}>
<Text style={{marginRight:'10%'}}> High sugar level (200+) for 24 hours  </Text>
<Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={highValue ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setHighValue(!highValue) }}
                    value={highValue}
                />

</View>
<View style={{flexDirection:'row',marginBottom:'2%'}}>
<Text style={{marginRight:'22%'}}>2 Hours after low sugar value  </Text>
<Switch
                    style={styles.switch}
                    trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }}
                    thumbColor={afterPanicButton ? "#FFCF84" : "#3CA6CD"}
                    ios_backgroundColor="#FFCF84"
                    onValueChange={() => { setAfterPanicButton(!afterPanicButton) }}
                    value={afterPanicButton}
                />

</View>
</View>

  return (
      <View style={styles.container}>
      <Header 
      title='Setting'
      flex={0.1}
      // paddingRight={6}     
      possiton={29}
      />
       <View style={{flex:0.5}}>
       {/* <ScrollView> */}
  <TouchableOpacity > 
   <Text style={styles.txt}> Edit personal information              <AntDesign name="right" size={20} color="black" /></Text> 
  </TouchableOpacity>
  
  <TouchableOpacity onPress={()=>setShow(true)}> 
  <Text style={styles.txt}> Change password                          <AntDesign style={{justifyContent:'flex-end'}} name="right" size={20} color="black" />
</Text>    
  </TouchableOpacity>
    
  <TouchableOpacity onPress={()=>{setOpenDiv(!openDiv)}}> 
  <Text style={styles.txt}> Edit notification                               {openDiv?
   <AntDesign  name="down" size={20} color="black" />:
   <AntDesign name="up" size={20} color="black" />}
</Text>    

  </TouchableOpacity>
  {openDiv && element}
{show && <ForgotPasswordPopUp setShow={(isShow) => setShow(isShow)}/>}
{/* 
  <TouchableOpacity > 
   <Text style={styles.txt}> bla bla bla bla                                  <AntDesign name="right" size={20} color="black" /></Text> 
  </TouchableOpacity> */}
  {/* </ScrollView> */}
       </View>



       <View style={{flex:0.3}}>
         <Image
      style={styles.Image}
      source={require('../images/home_img.webp.png')}
      />
      </View>

      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center'
}, 
txt:{
  fontSize:20,
  marginLeft:'3%',
  marginBottom:'10%',
},
switch: {
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
  marginRight: '2%',
},
Image: {
  flex:5,
  //position:'absolute',
  //resizeMode: 'cover',
  width: '50%',
  height:'90%',
  top: '1%',
  alignSelf: 'flex-end',
  justifyContent:'flex-end',
  opacity: 0.95,
},
})