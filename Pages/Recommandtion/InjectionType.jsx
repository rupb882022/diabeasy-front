import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../../CTools/Button';
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading';
import { UserContext } from '../../CTools/UserDetailsHook'
import {get_food_for_hipo} from '../../Functions/Function'
import Alert from '../../CTools/Alert';
import {ImageUri} from '../../Routes/Url';

export default function InjectionType({ navigation }) {

  const [hipoFood, setHipoFood] = useState()

  const [alert, setAlert] = useState()
  const { userDetails } = useContext(UserContext);

  const get_food = async() => {

    if (!hipoFood) {
     await get_food_for_hipo(userDetails.id).then((resulte) => {
        console.log("resulte", resulte);
        if(resulte){
        setHipoFood(resulte)
        }
      }, (error) => {
        setAlert(
          <Alert text="we are so sorry somting is got wotng try agine later"
              type='worng'
              time={3500}
          />)
        console.log(error + " get_food_for_hipo")
      })
;
    }else{
      navigation.navigate('HipoRec',{'hipoFood':hipoFood})
    }

  }
useEffect(()=>{
  if(hipoFood){
  navigation.navigate('HipoRec',{'hipoFood':hipoFood})
  }
},[hipoFood])
  return (
    <View style={styles.container}>
      {alert&&alert}
      <Header
        title='Injection'
        flex={0.1}
        paddingRight={4}
        possiton={41}
      />
      <Text style={styles.txt}>Choose Recommandtion</Text>
      <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <Button
          text='Fix'
          radius={1000}
          width={8}
          height={8}
          // onPress={() => { alert('By press OK, \n your project will delete in 10 seconds') }}
        />
        <Button
          text='Food'
          radius={1000}
          width={6}
          height={8}
          padding={0}
          onPress={() => navigation.navigate('Insert Data')}
        />
        <Button
          text='Hipo'
          radius={1000}
          width={6}
          height={8}
          onPress={()=>{get_food();}}
        />


      </View>
      <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image
          style={styles.Image}
          source={{uri:ImageUri+'rec1.png'}}
        />
        <Image
          style={styles.Image}
          source={{uri:ImageUri+'rec1Boy.png'}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  Image: {
    flex: 0.5,
    // position:'absolute',
    resizeMode: 'contain',
    width: '50%',
    height: '100%',
    top: '7%',
    alignSelf: 'flex-end',
    opacity: 0.85,
  },
  txt: {
    textAlign: 'center',
    flex: 0.05,
    fontSize: 20,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    paddingBottom: '2%'
  },

})