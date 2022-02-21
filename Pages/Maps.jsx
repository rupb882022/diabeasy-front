import { StyleSheet, Text, View,Dimensions, Alert, Vibration } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import MapView, { Callout, Circle, Marker ,PROVIDER_GOOGLE,OverlayComponent} from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'; 
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default function Maps() {
   const [distance,setDistance]= useState(0)

  const [pin,setPin]=useState({
    latitude: 32.34245547297243,
   longitude:34.911549397360595
   })

   const [region,setRegion] = useState({
		latitude: 32.34245547297243,
		longitude: 34.911549397360595,
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
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


<GooglePlacesAutocomplete
      placeholder='Search'
      autoFocus={true}
      fetchDetails={true}
     // listViewDisplayed='auto'    // true/false/undefined
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types:'gym', //'food',
      }}      
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta:  0.0125,
          longitudeDelta: 0.0121,
        });
      }}
      query={{
        key: 'AIzaSyCV-2W1x_rZGIM8ZyvYpnFu6A5J_OQFyhU',
        language: 'en',
        //components: "country:us",
				//	types: "establishment",
					radius: 10000,
					location: `${region.latitude}, ${region.longitude}`
      }}
      styles={{container:{flex:0,position:'absolute',top:'9%',width:'100%',zIndex:1}}}
     // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
      //nearbyPlacesAPI="GooglePlacesSearch"
     
    />
<MapView 
loadingEnabled={true}
style={{flex: 0.9,marginBottom:'16%'}}
initialRegion={{
  latitude: 32.34245547297243,
  longitude:34.911549397360595 ,
 latitudeDelta: 0.0125,
 longitudeDelta: 0.0121,
}}
showsUserLocation={true}
showsMyLocationButton={true}
nearbyPlacesAPI="GooglePlacesSearch"
//onRegionChangeComplete={(region)=>{setRegion(region)}}

provider='google'  //--> By delete this line, the maps provider will be Apple
 >
   <View style={{alignSelf:'flex-start', position: 'absolute', top: 10, width: '38%',height:'15%' }}>
  <Input
  label='Radius:'
 //style={styles.input}
 placeholder={'How many KM?'}
 placeholderTextColor='black'
 keyboardType='numeric'
 getValue={(value) => setDistance(value*1000/2)}
 />
</View>
<Marker 
coordinate={{latitude: region.latitude, longitude: region.longitude }}
title="I'm Here !"/>
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
  <Text>I Want to be Here!</Text>
</Callout>

</Marker>
<Circle
center={pin} 
radius={distance}
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
  // input:{
  //   borderRadius: 10,
  //    margin: 10,
  //    color: '#000',
  //     borderColor: 'black',
  //    borderWidth: 1,
  //    height: 9,
  //    paddingHorizontal: 10,
  //    fontSize: 18,
  // },
});