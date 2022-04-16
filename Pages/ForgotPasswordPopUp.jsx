import { StyleSheet, Text, View, Image, } from 'react-native';
import React, { useState } from 'react';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { flushSync } from 'react-dom'
import * as Progress from 'react-native-progress'
import { Rest_password } from '../Functions/Function'

export default function ForgotPasswordPopUp(props) {
  const { show, setShow } = props
  const [mail, setMail] = useState();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [validtion, setValidtion] = useState('')
  const [password, setPassword] = useState('')
  const [approve, setApprove] = useState('')

  const passwordValid = (value) => {
    //wiil render the page at the end of function
    flushSync(() => {
      password == value ? setValidtion('') : setValidtion('    not the same password')
    })
  }

  const checkCode=()=>{
if(password==code){
  //need to check if doctor or patient code%2==0
  setApprove(true)
  setValidtion('')
}else{
  setApprove(false)
  setValidtion('not the right code')
}
  }

  const getPassword = () => {
    if (mail) {
      setLoading(true)
      let tempMail=mail.replace(".","=");
        Rest_password(tempMail).then((resulte) => {
        console.log("resulte", resulte);
        if (resulte) {
          setCode(resulte);
          setPassword('');
        }
        setLoading(false)
      },
        (error) => {
          console.log("error in function Rest_password", error)
          setLoading(false)
        })
    }
  }
  // const sendEmail = async() => {
  //   let params={
  //        subject: "subject1",
  //        body:"body1",
  //        to:"tal_farkash@walla.com",
  //   }
    
  //   console.log("params",params);
  //     emailjs.send('service_1hsmgrq', 'template_lulvgxf',params, 'AGouvb_bFo7_5FLGk')    .then((result) => {
  //     console.log("res=>",result.text);
  // }, (error) => {
  //     console.log("err=>",error.text);
  // });   
  //    };
  return (
    <PopUp
      style={styles.container}
      width={80}
      height={48}
      isButton={false}
      button_txt='Cancle'
      backgroundColor="#bbe4f2"
      button_height='4'
      element={
        <>
          <View style={styles.head}>
            <Image style={styles.imgPopup} source={require('../images/forget_password_popup.png')} />
            <Text style={styles.title}> {'Forgot Your \n Password?'}</Text>
          </View>
          <Text style={styles.bodytxt}> Dont Worry! Enter your Email for password restore </Text>ד
          <View style={styles.mail}>
            {!approve ? <Input
              keyboardType='email-address'
              placeholder={!code?'Enter Your Email Adress':'enter 4 digits code..'}
              getValue={(value) => { setMail(value) }}
              width={98}
              height={50}

            /> :
              <>
                <Input
                  label='set new password'
                  keyboardType='email-address'
                  placeholder='Enter your new password'
                  getValue={(value) => setPassword(value)}
                  width={98}
                  height={50}
                  secure={true}
                  setValue={password}
                />
                <Input
                  placeholder='Confirm Password'
                  secure={true}
                  required={true}
                  validLable={validtion && validtion}
                  getValue={(value) => { passwordValid(value) }}
                  width={98}
                  height={50}

                />
              </>
            }
          </View>
          {!code && loading && <View style={styles.progress}>
            <Progress.Bar
              width={255}
              height={15}
              borderRadius={5}
              borderColor={"#bbe4f2"}
              color='#69BEDC' //#FFCF84-orange
              useNativeDriver={true}
              borderWidth={2}
              indeterminate={true}
              animationConfig={{ bounciness: 20 }}
            />
          </View>}
          <View style={styles.buttons}>
            <Button
              alignItems='center'
              justifyContent='center'
              width={24}
              height={6}
              text='send'
              onPress={code?checkCode:getPassword}
            />
            <Button
              alignItems='center'
              justifyContent='center'
              width={20}
              height={6}
              text='cancel'
              onPress={() => setShow(false)}
            />
          </View>
        </>
      }


    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //alignItems: "center",
  },
  title: {
    fontSize: 30,
    width: '70%',
    height: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#1EA6D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 0.8,
  },
  head: {
    flexDirection: 'row',
    height: '22%'
  },
  bodytxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
    // padding: '1%',
    paddingBottom: '10%',
    marginTop: '10%',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row'
  },
  mail: {
    flex: 1,
    width: '100%'
  },
  imgPopup: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 0.2
  },
  progress: {
    width: '97%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    bottom: '5%'
  }


});
