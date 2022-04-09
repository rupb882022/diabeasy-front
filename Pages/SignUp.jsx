import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect } from 'react'
import Header from '../CTools/Header'
import Button from '../CTools/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../CTools/Loading';

//Todo fix css title header
export default function SignUp({ navigation }) {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setInterval(() => setLoading(false), 1500);
  },[])

  return (
    <View style={styles.container}>
       {loading && <Loading opacity={'#d6f2fc'} />}
      <Header 
        title='Create your account'
        logo_image='diabeasy'
        fontSize={27}
        image_width={200}
        image_heigt={200}
       
        justifyContent='flex-end'
        flexDirection="column-reverse"
        alignItems='center'
        //paddingRight={25}
        line={false}
        possiton={10}
      //image_marginBottom={40}
      />



      <View style={styles.buttons}>
        <Button text='Patient' width={18} height={8} alignItems='center' onPress={()=>{setLoading(true); navigation.navigate('PersonalInfo1',{user:'Patient'})}} />
        <Button text='Doctor' width={18} height={8} alignItems='center' onPress={()=>{setLoading(true); navigation.navigate('PersonalInfo1',{user:'Doctor'})}} />
      </View>

      <TouchableOpacity style={styles.SignIn} onPress={() =>{ navigation.navigate('Login')}}>
        <Text> Already have an account?  <Text style={{ color: 'blue' }}>Sign in</Text></Text>
      </TouchableOpacity>



      <Image
        style={styles.Image}
        source={require('../images/registration.JPG.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'flex-start',

  },
  Image: {
    height: '25%',
    resizeMode: 'cover',
    width: '50%',
    alignSelf: 'center',
    opacity: 0.95,
    marginBottom: '30%',
    marginTop: '10%',
  },

  buttons: {
    flexDirection: 'row',
    //alignItems:'center',
    //justifyContent:'space-around',
    flex: 1,
    paddingTop: '40%',
    marginTop: '15%'
  },
  SignIn: {
    //paddingBottom:'25%',
    marginBottom: '0%',
    alignItems: 'center',
    //justifyContent:'flex-start'

  }
})