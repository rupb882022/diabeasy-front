import { View, Text ,StyleSheet,Image, ScrollView, ViewBase} from 'react-native'
import React, { useState } from 'react'
import Header from '../CTools/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Button from '../CTools/Button';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';

export default function Prescriptions(props) {
const {navigation} =props

const [show, setShow] = useState(false);

const [prescriptions,setPrescription]=useState([
{id: 1, date_time:'01/01/2022', subject:'new prescription',value: 'need more insullin'  },
{id: 2, date_time: '02/02/2022', subject:'new prescription2.0',value: 'need  insullin'  },
{id: 3, date_time: '03/03/2022', subject:'new prescription3.0',value: ' more insullin please'  },
{id: 4, date_time: '04/04/2022', subject:'new prescription4.0',value: ' more  please'  },
{id: 5, date_time: '05/05/2022', subject:'new prescription5.0',value: '  insullin please'  },
{id: 6, date_time: '06/06/2022', subject:'new prescription6.0',value: ' more insullin please'  }
]);

let icon=<MaterialCommunityIcons name="pill" size={24} color="black"/>;


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
{prescriptions.map(item=>(
  
<View key={item.id} style={styles.oneItem}>
<Text style={{fontWeight:'bold',fontSize:15,textAlign:'center'}}>{icon}Request from {item.date_time}</Text>
<Text style={{textAlign:'center'}} >{item.subject} - {item.value} </Text>
</View>
))

}
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
{
  show?<PopUp
  setShow={(isShow) => setShow(isShow)}
  width={80}
  height={48}
  isButton={false}
  button_txt='Cancle'
  backgroundColor="#bbe4f2"
  button_height='4'
   element={
    <View >
<Text style={styles.popuptitle}> {'New Prescription'}</Text>
<View style={styles.inputs}>
<Input 
placeholder='select your medicine'
type='selectBox'
label='Medicine'
editable={false}
SelectBox_placeholder='Select your medicine'
//justifyContent='flex-start'
alignItems='flex-start'
//alignSelf='flex-start'
width='100%'
height='80%'
flex={0.2}
selectBox_items={[
    { itemKey: 0, label: 'insulin-1', value: 'insulin-1' },
    { itemKey: 1, label: 'insulin-2', value: 'insulin-2' },
    { itemKey: 2, label: 'insulin-3', value: 'insulin-3' },
]}/>

<Input
placeholder='Write to your doctor...'
label='Something else?'
alignItems='flex-start'
justifyContent='flex-start'
multiline={true}
numberOfLines={4}
width='100%'
height='80%'
/>
</View >
    <View style={styles.popupbuttons}>
    <Button
text='cancle'
onPress={() => { setShow(false); }}
justifyContent='flex-end'
height={10}
width={15}
/>
<Button
text='send'
justifyContent='flex-end'
alignItems='flex-end'
height={10}
width={20}
/>
</View>
</View>}
/>:<></>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
   //   justifyContent: 'center'
  },
  Image: {
    // height: '25%',
     resizeMode: 'cover',
    // width: '50%',
     alignSelf: 'center',
     opacity: 0.95,
    // marginBottom: '30%',
    paddingTop: '23%',
    width: '32%',
    height: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flex: 0.5,
    marginTop:'5%'
  },
  list:{

paddingTop:'15%',
paddingBottom:'15%',
flex:0.5,

  },
  oneItem:{
borderWidth:2,
// marginBottom:'2%',
// marginLeft:'2%'
margin:'2%',
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
    justifyContent:'flex-end'
    
  },
  inputs:{
    justifyContent:'flex-start',
    flex:1,

  }
  

});