import { View, Text ,StyleSheet,Image, ScrollView, Switch} from 'react-native'
import React, { useState ,useContext,useEffect} from 'react'
import Header from '../CTools/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Button from '../CTools/Button';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../CTools/UserDetailsHook';
import upiUrl from '../Routes/Url'

export default function Prescriptions(props) {
const {navigation} =props

const [show, setShow] = useState(false);
const [showDetails, setShowDetails] = useState(false);
const [idDetails, setIdDetails] = useState(0);
const {userDetails} = useContext(UserContext);

const [popupSubject, setPopupSubject] = useState(false);

const [prescriptions,setPrescription]=useState([

  {"id":1,"date_time":"2022-02-01T00:00:00","subject":"insulin num1","value":"need more please"},
{"id":2,"date_time":"2022-02-10T00:00:00","subject":"more stickers","value":"stikers are running out"},
{"id":4,"date_time":"2022-03-01T00:00:00","subject":"ritalin and insulin","value":"everything done"},
{"id":5,"date_time":"2022-03-10T00:00:00","subject":"more stickers","value":"have 10 mor"},
{"id":6,"date_time":"2022-03-15T00:00:00","subject":"indulin num 2","value":"need more"},
{"id":7,"date_time":"2022-03-20T00:00:00","subject":"num 3 insulinush","value":"what else???"}
])
//"http://localhost:52665/api/Prescription/3"

const getPrescriptions = () => {
  if(!prescriptions){
      fetch(upiUrl + `Prescription/${userDetails.id}`, {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'appliction/json; charset=UTF-8',
              'Accept': 'appliction/json; charset=UTF-8'
          })
      }).then(res => {
          if (res && res.status == 200) {
              return res.json();
          } else {
              console.log("status code:", res.status)
          }
      }).then((result) => {
        console.log('result=>', result);
         prescriptions(resulte)
      },
          (error) => {
              console.log("error", error)
          })
        }
}
useEffect(() => {
  //get all user prescription

  getPrescriptions()
}, []);



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
      //getValue={(value) => setSubject(value)}
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
      value={!popupSubject && ''}
      width={100}
      //getValue={(value) => setSubject(value)}
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
   // getValue={(value) => setCommentValue(value)}
    justifyContent='center'
    alignItems='center'
   // validLable={!commentValue || !subject ? '    fill in subject and description' : ''}
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
  // onPress={() => {
  //   if (commentValue && subject&&userDetails) {
  //     if (userDetails.id % 2 == 0) {
  //       setComment({
  //         date_time: moment(new Date().toString()).format('MM-DD-YYYY').toString(),
  //         subject: subject,
  //         value: commentValue,
  //         Doctor_id: userDetails.id,
  //       });
  //     } else {
  //       setComment({
  //         date_time: moment(new Date().toString()).format('MM-DD-YYYY').toString(),
  //         subject: subject,
  //         value: commentValue,
  //         Patients_id: userDetails.id,
  //       });
  //     }
  //     setShow(false);
  //   }
  // }}
>
</Button>
</View>
</View>




let icon=<MaterialCommunityIcons name="pill" size={24} color="black"/>;

const btnPrescDetails=(id)=>{
id-=1;
setIdDetails(id);
 setShowDetails(true);
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
<View style={styles.viewcon}>
{prescriptions.map(item=>(
  
<View key={item.id} style={styles.oneItem}>
  <TouchableOpacity onPress={()=>{btnPrescDetails(item.id)}}>
<Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>{icon} - Request from {item.date_time}</Text>
</TouchableOpacity>
</View>
))

}
</View>
</ScrollView>
<Button 
text='New prescription request'
width={12}
height={4}
alignItems='center'
justifyContent='flex-end'
onPress={() => setShow(true)}

//justifyContent='flex-end'
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

{showDetails && prescriptions&&
      <PopUp
      height={45}
      width={90}
      setShow={setShowDetails}
      backgroundColor='#d6f2fc'
text='dasdasdsa'
element={<>
<Text style={{textAlign:'center',fontWeight:'bold',fontSize:30,marginBottom:'10%'}} >{prescriptions[idDetails].subject} </Text>
<Text style={{textAlign:'center',marginBottom:'5%'}}> Request details: </Text>
<Text style={{textAlign:'center',fontSize:20}}>{prescriptions[idDetails].value} </Text>
<Text style={{textAlign:'center',marginTop:'10%'}}>request from : {prescriptions[idDetails].date_time} </Text>
</>
}
/>}

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
// borderWidth:1,
// marginBottom:'2%',
// marginLeft:'2%'
margin:'3%',
justifyContent:'flex-start'
  },
  title:{
    alignSelf:'center',
    position:'absolute',
    top:'10%',
    fontSize:20,
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
  inputs:{
    justifyContent:'flex-start',
    flex:1,

  }
  

});