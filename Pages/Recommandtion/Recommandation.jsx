import { View, Text, StyleSheet, Image ,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Button from '../../CTools/Button';
import Loading from '../../CTools/Loading';
import Header from '../../CTools/Header';
import Alert from '../../CTools/Alert';
import { useFocusEffect } from '@react-navigation/native';
import { ImageUri } from '../../Routes/Url';
import { Post_user_data } from '../../Functions/Function'
import Input from '../../CTools/Input';
export default function Recommandation({ route, navigation }) {

  const [fixunit, setFixUnit] = useState()
  const [foodUnit, setFoodUnit] = useState()
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState()
  const [value_of_ingection, setValue_of_ingection] = useState();
  const [showInpit, setShowInput] = useState(false);
  // const [keyboardStatus, setKeyboardStatus] = useState(false);

  let detials = route.params && route.params.detials ? route.params.detials : '';



  const save_data = (value_of_ingection) => {
    let data = {
      ExceptionalEvent: detials.ExceptionalEvent,
      Patients_id: detials.Patients_id,
      blood_sugar_level: detials.blood_sugar_level,
      date_time: detials.date_time,
      food: detials.food,
      injectionType: detials.injectionType,
      injection_site: detials.injection_site,
      totalCarbs: detials.totalCarbs,
      value_of_ingection: value_of_ingection,
      system_recommendations: total
    }
    console.log("data", data)
    setLoading(true)
    Post_user_data(data).then((response) => {
      setInterval(() => setLoading(false), 1000);
      return response
    }).then((response) => {
      response && navigation.navigate('Repotrs - Table');
    })
      .catch((error) => {
        setLoading(false)
        setAlert(
          <Alert text="sorry somting is got wotng try agine later"
            type='worng'
            bottom={30}
          />)

        console.log("error in function Post_user_details " + error);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("*")



      // fixunit&&setFixUnit(0)
      // foodUnit&&setFoodUnit(0)
      // total&&setTotal(0)

      total_reccomandtion();
       setShowInput(false);
    }))


    console.log("fixunit",fixunit)
    console.log("foodUnit",foodUnit)
     console.log("total",total)

  const total_reccomandtion = () => {
console.log("detials",detials)
    if (detials) {
      console.log("+++++++++++++++++++++++++++++++++++++")
      let temptotal = 0
      if (detials.reccomandtion.fix && detials.reccomandtion.food) {
        let food = (parseInt(detials.totalCarbs)) / parseFloat(detials.reccomandtion.food)
        let fix = (parseInt(detials.blood_sugar_level) - 100) / parseFloat(detials.reccomandtion.fix)

        food = Math.floor(food)
        fix = Math.floor(fix)
        setFoodUnit(food);
        setFixUnit(fix);
        temptotal = fix + food;
      } else if (detials.reccomandtion.food) {
        temptotal = (parseInt(detials.totalCarbs)) / parseFloat(detials.reccomandtion.food)
        setFoodUnit(0);
        setFixUnit(0);
      } else if (detials.reccomandtion.fix) {
        temptotal = (parseInt(detials.blood_sugar_level) - 100) / parseFloat(detials.reccomandtion.fix)
        setFoodUnit(0);
        setFixUnit(0);
      }
      setTotal(Math.floor(temptotal));
    }
  }

  return (<>
    {loading && <Loading />}
    {alert && alert}
    <Header
        title='Recommandation'
        flex={0.11}
        marginLeft={13}
        possiton={25}
      />
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

      <View style={{ flex: 0.7, alignItems: 'center', backgroundColor: '#ffffff80', width: '90%', alignSelf: 'center', borderRadius: 50, bottom: '5%' }}>
        <View style={{ paddingTop: '8%', alignItems: 'center' }}>
          {total && total != 0 ? <><Text style={styles.txt}>The injection recommandation for you is</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {total} units </Text></> : <></>}
          {fixunit && fixunit != 0 ? <Text style={styles.txt}>ratio of fix injection {fixunit} units </Text> : <></>}
          {foodUnit && foodUnit != 0 ? <Text style={styles.txt}>ratio of cabs injection {foodUnit} units </Text> : <></>}
        </View>
        <Image
          style={styles.Image}
          source={{ uri: ImageUri + 'rec.png' }}
        />


        <Text style={styles.txt}>do you use the recommandation?</Text>
        {!showInpit && <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 0.25, paddingLeft: '15%', marginTop: '2%' }}>
          <Button
            alignItems='center'
            width={6}
            height={5}
            text='yes'
            radius={10}
            onPress={() => { save_data(total); }}
          />
          <Button
            alignItems='flex-start'
            width={9}
            height={5}
            text='no'
            radius={10}
            onPress={() => { setShowInput(true); }}
          />
        </View>}
        {showInpit &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 0.25, paddingLeft: '14%' }}>

            <Input
              placeholder=' Insert the injection value'
              validtion='float'
              alignItems='flex-start'
              width={125}
              getValue={(value) => setValue_of_ingection(value)}
             keyboardType='decimal-pad'
            />
            <Button
              alignItems='center'
              justifyContent='center'
              width={7}
              height={5}
              text='save'
              radius={10}
              onPress={() => { save_data(value_of_ingection); }}
            />
          </View>}
      </View>

    </View>
    {/* <View style={{ position: 'absolute', bottom: '0%', left: '28%' }}>
      <Button
        flex={1}
        alignItems='center'
        width={15}
        height={5}
        text='back'
        radius={10}
        textSize={20}
        onPress={() => { navigation.goBack() }}
      />
    </View> */}
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  Image: {
    flex: 0.75,
    // position:'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // top: '26%',
    bottom: '1%',
    opacity: 0.85,
  },
  txt: {
    fontSize: 16,
    flexWrap: 'wrap',
    padding: '1%', paddingHorizontal: '5%'
  }
})
// console.log("keyboardStatus",keyboardStatus)
//       useEffect(() => {
//         const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//           setKeyboardStatus(true);
//         });
//         const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//           setKeyboardStatus(false);
//         });

//         return () => {
//           showSubscription.remove();
//           hideSubscription.remove();
//         };
//       }, []);