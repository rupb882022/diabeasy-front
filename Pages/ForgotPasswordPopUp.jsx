import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { flushSync } from 'react-dom'
import * as Progress from 'react-native-progress'
import { Rest_password, set_password } from '../Functions/Function'
import Alert from '../CTools/Alert'

export default function ForgotPasswordPopUp(props) {
  const { show, setShow, navigation,set_alert } = props
  const [mail, setMail] = useState();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [password, setPassword] = useState('')
  const [approve, setApprove] = useState(false)
const [passwordValid,setPasswordValid]=useState('')


  
const set_new_password=()=>{
  
  if (password.length < 8) {
    setAlert(
      <Alert text="please set 8 characters password"
        type='alert'
        time={3000}
        bottom={80}
      />)
    return;
  }
  if (password != passwordValid) {
    setAlert(
  <Alert text="not the same password"
    type='alert'
    time={3000}
    bottom={80}
  />)
  return;
}

setLoading(true)
let tempMail = mail.replace(".", "=");
  let userDetails = {
    email: tempMail,
    password: password
  }
  set_password(userDetails).then((respone) => {

  loading&&setInterval(() => setLoading(false), 1000);
  set_alert();
    respone && setShow(false);
  }, (error) => {
    console.log("error in function set_password", error)
  })
}

  const checkCode = () => {
    if (password == code) {
      setApprove(true)
      setPassword(null);
      

    } else {
      setAlert(
        <Alert text="not the right code"
          type='alert'
          time={3000}
          bottom={80}
        />)
    }
  }

  const getPassword = () => {
    if (mail) {
      setLoading(true)
      let tempMail = mail.replace(".", "=");
      Rest_password(tempMail).then((resulte) => {
        console.log("resulte", resulte);
        if (resulte) {
          setCode(resulte);
        }
        setLoading(false)
      },
        (error) => {
          console.log("error in function Rest_password", error)
          setAlert(
            <Alert text="cannot find email"
              type='alert'
              time={3000}
              bottom={80}
            />)
          setLoading(false)
        })
    }else{
      setAlert(
        <Alert text="insert email please"
          type='alert'
          time={3000}
          bottom={80}
        />)
    }
  }

  return (<>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text style={styles.bodytxt}>{approve? 'Enter new password' : 'Dont Worry! Enter your Email for password restore'} </Text>
              <View style={styles.mail}>
          {approve ? <View style={styles.mail}> 
            <Input
          keyboardType='email-address'
          placeholder='Enter your new password'
          getValue={(value) => setPassword(value)}
          width={98}
          height={60}
          secure={true}
          setValue={password}
        />
        <Input
          placeholder='Confirm Password'
          secure={true}
          required={true}
          getValue={(value) => { setPasswordValid(value) }}
          width={98}
          height={60}
        /></View>:<></>}
                {!approve && <>
                  <Input
                    keyboardType='email-address'
                    placeholder='Enter Your Email Adress'
                    getValue={(value) => { setMail(value) }}
                    width={98}
                    height={code ? 60 : 30}
                  />
                </>
                }
                {code && !approve && <>
                  <Input
                    keyboardType='numeric'
                    placeholder='enter 4 digits code..'
                    getValue={(value) => { setPassword(value) }}
                    width={98}
                    height={60}
                  />
                </>
                }
              </View>
              {code && !loading &&
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { getPassword(); }}>
                  <Text>didn't get the code?</Text>
                  <Text style={{ textDecorationLine: 'underline', textDecorationColor: 'blue' }}> re-send</Text>
                </TouchableOpacity>}
              {loading && <View style={styles.progress(code ? 0 : '5%')}>
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
                  text={code ? 'OK' : 'Send'}
                  onPress={() => {approve?set_new_password(): code ? checkCode() : getPassword() }}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    {alert && alert}
  </>
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
  progress: (bottom) => {
    return {
      width: '97%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      bottom: bottom
    }
  }


});
