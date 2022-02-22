import { StyleSheet, Text, View,Dimensions, Vibration ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Callout, Circle, Marker ,PROVIDER_GOOGLE} from 'react-native-maps'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PopUp from '../CTools/PopUp';


export default function Maps(props) {
  const [location, setLocation] = useState({});
   const [distance,setDistance]= useState(0)

  const [pin,setPin]=useState({
    latitude: 32.34245547297243,
   longitude:34.911549397360595
   })

   const [region,setRegion] = useState({
		latitude: '',
		longitude: '',
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
   })

   const [show, setShow] = useState(false);


   useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location)
      setRegion({
        latitude: location.coords.latitude,
    longitude:location.coords.longitude,
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
      });
      setPin({
        latitude: location.coords.latitude,
        longitude:location.coords.longitude})
    })
    ();
  }, []);

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
         // location: {latitude:region.latitude,longitude: region.longitude}

      }}
      styles={{container:{flex:0,position:'absolute',top:'9%',width:'100%',zIndex:1}}}
     // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
     // currentLocationLabel="Current location"
      //nearbyPlacesAPI="GooglePlacesSearch"
     
    />
<MapView 
loadingEnabled={true}
style={{flex: 0.9,marginBottom:'16%'}}
initialRegion={{
  latitude:32.166313,
  longitude:34.843311,
 latitudeDelta: 0.9125,
 longitudeDelta: 0.0121,
}}

onUserLocationChange={(e)=>{//console.log("onUserLocationChange",e.nativeEvent)
setRegion({  latitude: e.nativeEvent.coordinate.latitude,
  longitude: e.nativeEvent.coordinate.longitude,
  latitudeDelta:  0.0125,
  longitudeDelta: 0.0121})
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
coordinate={region}
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
<TouchableOpacity 
style={styles.info}
onPress={() => setShow(!show)}
>      
<SimpleLineIcons name="info" size={28} color="black" />
</TouchableOpacity> 
 
</MapView>
 {show ?     
   <PopUp             
   setShow={(show)=>setShow(show)}
   width={80}
    height={51}
    element={
      <>
     <SimpleLineIcons name="info" size={28} color="black" />
     <Text style={{marginBottom:'10%',fontWeight:'bold'}}> Instructions : </Text>
     <Text>{ `1.Location must be Active for use this page!\n
                (if it doesn't work go to setting->expo->active location)\n
              2.Hold the pin and drag it to where you wanna be\n
              3.Circle will apper after writing number for distance\n
              4. stam stam stam`}</Text>
     </>
     }
    button_txt='Close'
    backgroundColor="#bbe4f2"
    button_height='4'
     /> : <></>}
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
  info:{
alignItems:'flex-end',
paddingTop:'2%',
paddingRight:'2%'

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