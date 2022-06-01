import { View, Switch,Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import React,{useContext, useState} from 'react';
import {UserContext} from '../CTools/UserDetailsHook'
import { AntDesign } from '@expo/vector-icons'; 
import Button from '../CTools/Button';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import { ScrollView } from 'react-native-gesture-handler';
import ForgotPasswordPopUp from './ForgotPasswordPopUp';
import {ImageUri} from '../Routes/Url'
import PopUp from '../CTools/PopUp';
import { POST_EmergancyPhoneNumber } from '../Functions/Function';
import AlertTool from '../CTools/Alert';

export default function Setting({navigation}) {
const [openDiv,setOpenDiv]=useState(false)
const [afterFood,setAfterfood]=useState(false)
const [eightHours,setEightHours]=useState(false)
const [highValue,setHighValue]=useState(false)
const [afterPanicButton,setAfterPanicButton]=useState(false)
const [show, setShow] = useState(false);
const [popupPhone, setPopupPhone] = useState(false);
const [newPhone, setNewPhone] = useState();
const { userDetails } = useContext(UserContext);
const [alertTool, setAlertTool] = useState();


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

const saveNumber=()=>{
  if (newPhone) {
  POST_EmergancyPhoneNumber(userDetails.id,newPhone.toString()).then((resulte)=>{
  resulte&&console.log('resultePhoneNumber TEST');
  //setAlert();
  setAlertTool(
      <AlertTool text="Phone number succesfully added :)"
          type='success'
          time={3000}
      />) 
      setPopupPhone(false);
  }).catch((error) => {
      setAlertTool(
      <AlertTool
         text="sorry, somthing went wrong, please try again later"
         type='worng'
         time={3000}
      />)
      console.log("error in function POST_EmergancyPhoneNumber" + error);
      setPopupPhone(false);
    })
      
  }

}

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
  <TouchableOpacity onPress={()=>navigation.navigate("EditPersonalInfo")}> 
   <Text style={styles.txt}> Edit personal information                  <AntDesign name="right" size={20} color="black" /></Text> 
  </TouchableOpacity>
  
  <TouchableOpacity onPress={()=>setShow(true)}> 
  <Text style={styles.txt}> Change password                              <AntDesign style={{justifyContent:'flex-end'}} name="right" size={20} color="black" />
</Text>    
  </TouchableOpacity>
    
  <TouchableOpacity onPress={()=>{setOpenDiv(!openDiv)}}> 
  <Text style={styles.txt}> Edit notification                                   {openDiv?
   <AntDesign  name="left" size={20} color="black" />:
   <AntDesign name="right" size={20} color="black" />}
</Text>    
  </TouchableOpacity>
  {openDiv && element}
{show && <ForgotPasswordPopUp
navigation={navigation}
setShow={(isShow) => setShow(isShow)}/>}

  <TouchableOpacity onPress={()=>setPopupPhone(true)}> 
   <Text style={styles.txt}> Edit emergancy phone number       <AntDesign name="right" size={20} color="black" /></Text> 
  </TouchableOpacity>
  {/* </ScrollView> */}
       </View>

{popupPhone&&<PopUp
height='30%'
isButton={false}
backgroundColor="#bbe4f2"
element={
<View>
<View style={styles.head}>
                <Text style={styles.title}> {'Emergancy number'}</Text>
              </View>
<View style={{justifyContent:'flex-start',flex:0.5}}> 
                <Input
                 label='Write an emergancy phone number:'
                 keyboardType='number-pad'
                 width='100%'
                 height='30%'
                 justifyContent='flex-start'
                 getValue={(value) => setNewPhone(value)}
                 />
                </View>
 
            <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:0.2}}>

  <Button text='Cancle' onPress={()=>setPopupPhone(false)}/>
  <Button text='Add' width={25} onPress={()=> saveNumber()}
/>
</View>
</View>
}
/>}

       <View style={{flex:0.3}}>
         <Image
      style={styles.Image}
      source={{uri:ImageUri+'settings.png'}}
      />
      </View>
{alertTool&&alertTool}
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
  flex:10,
  position:'absolute',
  resizeMode: 'contain',
  width: '100%',
  height:'100%',
  top: '38%',
  alignSelf: 'flex-end',
  justifyContent:'flex-end',
  opacity: 0.85,
},
title: {
  fontSize: 28,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'white',
  textShadowColor: '#1EA6D6',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
  //justifyContent: 'flex-start',
  //alignItems: 'flex-end',
},
head: {
  flexDirection: 'row',
  flex:0.3,

  //height: '22%'
},
})