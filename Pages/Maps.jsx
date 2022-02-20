import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Callout, Circle, Marker ,PROVIDER_GOOGLE,OverlayComponent} from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'; 
import Header from '../CTools/Header';
import Input from '../CTools/Input';

export default function Maps() {
  const [pin,setPin]=useState({
    latitude: 32.34245547297243,
   longitude:34.911549397360595
   })


  return (
<>

<Header
   title='Sports locations'
   logo_image='graph'
   flex={0.2}
   image_width={25}  
   //image_heigt={100}
   //image_margin={{ Bottom: -4}}
   //possiton={70}
   marginLeft={10}
   justifyContent='flex-start'/>
{/* <Input
placeholder='Search'/> */}


<MapView loadingEnabled={true}
style={{flex: 0.7,marginBottom:'10%'}}
 region={{
  latitude: 32.34245547297243,
  longitude:34.911549397360595 ,
 latitudeDelta: 0.0122,
 longitudeDelta: 0.0121,
}}
provider={PROVIDER_GOOGLE}  //--> By delete this line, the maps provider will be Apple
 >
   <View style={{ position: 'absolute', top: 10, width: '100%' }}>
  <Input
 style={styles.input}
 
 
 placeholder={'Search'}
 placeholderTextColor='black'
 />
</View>
<Marker 
coordinate={pin}
pinColor='blue'
draggable={true}
onDragStart={(e)=>{console.log("Drag start:",e.nativeEvent.coordinate );}}
onDragEnd={(e)=>{
  setPin({
    latitude: e.nativeEvent.coordinate.latitude,
    longitude: e.nativeEvent.coordinate.longitude
  })
}}

//title='my place:)'
//description='here i am'
//image={require('../assets/icon.png')}
>
<Callout>
  <Text>Im Over Here!</Text>
</Callout>

</Marker>
<Circle center={pin} 
radius={1000}
/>
</MapView>

</>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input:{
    borderRadius: 10,
     margin: 10,
     color: '#000',
      borderColor: 'black',
     borderWidth: 1,
     height: 9,
     paddingHorizontal: 10,
     fontSize: 18,
  },
});