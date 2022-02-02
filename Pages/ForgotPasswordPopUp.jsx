import { StyleSheet, Text, View ,Image} from 'react-native';
import React from 'react';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';

export default function ForgotPasswordPopUp(props) {
const {show ,setShow }=props


  return (

    <PopUp
    style={styles.container}
    setShow={(isShow)=>setShow(isShow)}
    width={80}
    height={51}
    element={
    <>
    <View style={styles.head}>
    <Image style={styles.imgPopup} source={require('../images/forget_password_popup.png')}/>
    <Text style={styles.title()}> {'Forgot Your \n Password?'}</Text>
    </View>
    <Text style={styles.bodytxt}> Dont Worry! Enter your Email for password restore </Text>
    <Input width={5} keyboardType='email-address' placeholder='Enter Your Email Adress' /> 
    </>
    }
    button_txt='SEND!'
    backgroundColor="#bbe4f2"
    button_height='4'
    
   />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //alignItems: "center",
},
title: (paddingRight =0, title_size = 30) => {
    return {
    fontSize: title_size,
      width: '70%',
      height: '100%',
      textAlign: 'center',
      paddingRight: paddingRight + '%',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: '#1EA6D6',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      justifyContent:'flex-start',
      alignItems:'flex-end',
      flex:0.8,

    }
  },
  head:{
      flexDirection:'row',
      height:'22%'
  },
  bodytxt:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize:15,  
    justifyContent:'center',
    padding: '7%',
    marginTop:'20%'
    

  },
imgPopup:{
    width:'20%',
    height:'100%',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    flex:0.2
    }


});
