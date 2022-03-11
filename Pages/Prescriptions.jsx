import { View, Text ,StyleSheet,Image, ScrollView, Switch} from 'react-native'
import React, { useState ,useContext,useEffect} from 'react'
import Header from '../CTools/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Button from '../CTools/Button';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../CTools/UserDetailsHook';
import upiUrl from '../Routes/Url';
import Moment from 'moment';
import Loading from '../CTools/Loading';
import * as Progress from 'react-native-progress';
import axios from "axios";


export default function Prescriptions(props) {
const {navigation} =props

const [show, setShow] = useState(false);
const [showDetails, setShowDetails] = useState(false);
const {userDetails} = useContext(UserContext);
const [popupElement, setPopupElement] = useState();
const [popupSubject, setPopupSubject] = useState(false);
const [prescriptions,setPrescriptions]=useState([])
const [loading, setLoading] = useState(false);
const [subject, setSubject] = useState(false);
const [reqValue, setReqValue] = useState(false);
const [request, setRequest] = useState({});


const getPrescriptions = () => {
  setLoading(true)
      fetch(upiUrl + `User/Prescription/${userDetails.id}`, {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'appliction/json; charset=UTF-8',
              'Accept': 'appliction/json; charset=UTF-8'
          })
      }).then(res => {
        console.log("res=> ",res.status);
          if (res && res.status == 200) {
              return res.json();
          } else {
              console.log("status code:", res.status)
              setLoading(false)
              return;
          }
      }).then((result) => {
       // console.log('result=>', result);
        setPrescriptions(result)
        setLoading(false)
      },
          (error) => {
              console.log("error", error)
              setLoading(false)
          })
        
        
}
useEffect(() => {
  //get all user prescription
<<<<<<< HEAD
=======
  // if(prescriptions==[]){
>>>>>>> tal
  getPrescriptions()
  console.log("pres=>",prescriptions);
}, []);


useEffect(() => {
  if (!show && request&&reqValue) {
    const configurationObject = {
      url:upiUrl+'Prescription/addRequest',
      method: "POST",
      data: request
    };
    console.log('DATA=>', request);
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          getPrescriptions();
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}, [request]);


const element = <View>
<Text style={{
  fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 'bold', marginBottom: '3%', textShadowColor: '#187FA5',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 1,
}}>new subject</Text>
<View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', width: '100%' }}>
  {popupSubject ?
    <Input
      label='Choose your medicine'
      height={50}
      type='selectBox'
      getValue={(value) => setSubject(value)}
      SelectBox_placeholder='Select medicine...'
      placeholder='Select medicine from list...'
      width={100}
      justifyContent='flex-start'
      alignItems='flex-end'
      editable={false}
      selectBox_items={[
        { itemKey: 0, label: 'insulin-1', value: 'insulin-1' },
        { itemKey: 1, label: 'insulin-2', value: 'insulin-2' },
        { itemKey: 2, label: 'insulin-3', value: 'insulin-3' },
    ]}/>
    :
    <Input
      label= 'Write new subject/medicine'
      height={50}
     // value={!popupSubject && ''}
      width={100}
      getValue={(value) => setSubject(value)}
      justifyContent='flex-start'
      alignItems='flex-end'
      placeholder='type new subject/medicine...'
    />
  }
  <Switch
    style={{ alignSelf: 'center', marginLeft: '7%', marginTop: '3%' }}
    trackColor={{ false: "#FFFFFF", true: "#3CA6CD" }}
    thumbColor={popupSubject ? '#FFCF84' : "#3CA6CD"}
    ios_backgroundColor='#FFCF84'
    onValueChange={() => { setPopupSubject(!popupSubject) }}
   // value={!commentValue && !subject ? popupSubject : ''}
  />

</View>
<View style={{ flex: 3, justifyContent: 'flex-start',paddingBottom:'5%' }}>
  <Input
  label='Something else? ♥'
    placeholder='Free text here..'
    multiline={true}
    numberOfLines={4}
    height={70}
    width={100}
    getValue={(value) => setReqValue(value)}
    justifyContent='center'
    alignItems='center'
    validLable={!reqValue || !subject ? '    fill subject and description' : ''}
  />
</View>
<View style={{flexDirection:'row'}}>
<Button
   text='cancel'
   justifyContent='center'
   alignItems='center'
   width={10}
   height={3}
   onPress={()=> setShow(false)}
/>
<Button
  text='ok'
  justifyContent='center'
  alignItems='center'
  width={20}
  height={3}
   onPress={() => {
    if (reqValue && subject && userDetails) {
        setRequest({
          date_time: Moment(new Date().toString()).format('MM-DD-YYYY H:mm').toString(),
          subject: subject,
          value: reqValue,
          Patients_id: userDetails.id,
          Doctor_id : 2        //todo change doctor id to real id
        });
      setShow(false);
    }
  }}
>
</Button>
</View>
</View>

let icon=<MaterialCommunityIcons name="pill" size={24} color="black"/>;
const btnPrescDetails=(id)=>{
// id-=1;
setShowDetails(true);
const onePrescription=prescriptions.find(x=>x.id ===id)
setPopupElement( 
<>
<Text style={{textAlign:'center',fontWeight:'bold',fontSize:30,marginBottom:'10%'}}> {onePrescription.subject} </Text>
<Text style={{textAlign:'center',marginBottom:'5%'}}> Request details: </Text>
<Text style={{textAlign:'center',fontSize:20}}>{onePrescription.value} </Text>
<Text style={{textAlign:'center',marginTop:'10%'}}>request from : {Moment(onePrescription.date_time).format('DD/MM/YYYY H:mm')} </Text>
</>
)

}

  return (
    <View style={styles.container}>
    <Header
        title='Prescriptions'
        logo_image='perscriptions'
        flex={1}
        image_margin={{ Bottom: -4}}
        marginLeft={7}
        // justifyContent='flex-start' 
        />
        <Text style={styles.title}>Your last request:</Text>
<ScrollView style={styles.list}> 
<View >
{prescriptions&&prescriptions.map((item)=>(
<View key={item.id} style={styles.oneItem}>
  <TouchableOpacity onPress={()=>{btnPrescDetails(item.id)}}>
<Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>{icon} - Request from {Moment(item.date_time).format('DD/MM/YYYY')}</Text>
</TouchableOpacity>
</View>
))

}
</View>
</ScrollView>
{ loading && <View style={styles.progress}>
            <Progress.Bar
              width={255}
              height={15}
              borderRadius={5}
              borderColor={"#bbe4f2"}
              color='#FFCF84' //-orange
              useNativeDriver={true}
              borderWidth={2}
              indeterminate={true}
              animationConfig={{ bounciness: 20 }}
            />
          </View>}

<Button 
text='New prescription request'
width={12}
height={4}
alignItems='center'
justifyContent='flex-end'
onPress={() => setShow(true)}
/>

<Image
style={styles.Image}
source={require('../images/welcom_man.JPG.png')}
/>
{show &&
        <PopUp
          height={45}
          width={90}
          isButton={false}
          button_textSize={16}
          setShow={setShow}
          backgroundColor='#d6f2fc'
          element={element}
          button_justifyContent='flex-start'
        />}

{showDetails && prescriptions &&
      <PopUp
      height={45}
      width={90}
      setShow={setShowDetails}
      backgroundColor='#d6f2fc'
      element={popupElement}
/>}
<<<<<<< HEAD

=======
{ loading &&<Loading/>}

{/* <View style={styles.progress}>
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
          </View> */}
          
>>>>>>> tal

</View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
   //   justifyContent: 'center'
  },

  Image: {
     resizeMode: 'cover',
     alignSelf: 'center',
     opacity: 0.95,
    paddingTop: '23%',
    width: '32%',
    height: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flex: 0.5,
    marginTop:'5%'
  },
  list:{
//flexWrap: 'wrap',
paddingTop:'15%',
paddingBottom:'15%',
flex:0.5,
 
  },
  oneItem:{

marginBottom:'5%',
justifyContent:'flex-start'
  },
  title:{
    alignSelf:'center',
    position:'absolute',
    top:'10%',
    fontSize:30,
    fontWeight:'bold',
  },
  popuptitle:{
    fontSize: 30,
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
    flex: 0.2,
    paddingBottom:15

  },
  popupbuttons:{
    flexDirection:'row',
    //justifyContent:'flex-end' 
  },
  progress: {
    width: '97%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  }

  

});