import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import Header from '../CTools/Header'
import Button from '../CTools/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignUp() {
  return (
       <View style={styles.container}>
            <Header
                title='Create your account'
                logo_image='diabeasy'
                image_width={100}
                image_heigt={200} 
                justifyContent='space-evenly'
                flexDirection="column-reverse"
                alignItems='center'
                //paddingRight={25}
                line={false}
                possiton={50}
            />
       

           
<View style={styles.buttons}>
<Button text='Patient' width={18} height={8} alignItems='center'/>
<Button text='Doctor' width={18} height={8} alignItems='center'/>
</View>

  <TouchableOpacity style={styles.SignIn} onPress={() => {}}>
      <Text> Already have an account?  <Text style={{color:'blue'}}>Sign in</Text></Text>
 </TouchableOpacity>



            <Image 
            style={styles.Image}
            source={require('../images/registration.JPG.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
},
Image: {
  height: '25%',
  resizeMode: 'cover',
  width: '50%',
  alignSelf: 'center',
  opacity: 0.95,
  marginBottom: '10%',
  marginTop: '0%'
},
buttons:{
  flexDirection:'row',
  //alignItems:'center',
  //justifyContent:'space-evenly',
  flex:1,
  paddingTop:'40%',
},
SignIn:{
  //paddingBottom:'25%'
marginBottom:'0%',


}
})