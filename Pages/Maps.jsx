import { StyleSheet, Text, View, Dimensions, Vibration, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { SimpleLineIcons } from '@expo/vector-icons';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PopUp from '../CTools/PopUp';
import Loading from '../CTools/Loading';

export default function Maps() {
  const [location, setLocation] = useState();
  const [distance, setDistance] = useState(0)
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);


  const [pin, setPin] = useState({
    latitude: 32.34245547297243,
    longitude: 34.911549397360595
  })

  const [region, setRegion] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
  })



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoading(false)
        alert('Go to setting and turn on access location for using this page')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLoading(false)
      setLocation(location)
      setRegion({
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
        latitudeDelta: 0.0125,
        longitudeDelta: 0.0121,
      });
      setPin({
        latitude: location&&Number(location.coords.latitude),
        longitude: location&&Number(location.coords.longitude)
      })
    })
      ();
  }, []);

  return (
    <>
      {loading && <Loading opacity={'#d6f2fc'} text='Choose location and start exercise' />}
      <Header
        title='Sports locations'
        logo_image='graph'
        flex={0.1}
        // image_width={20}
        //image_heigt={100}
        //image_margin={{ Bottom: -4}}
        possiton={25}
        // marginLeft={15}
        justifyContent='flex-start' />

      <GooglePlacesAutocomplete
        placeholder='Search...'
        autoFocus={true}
        fetchDetails={true}
        // listViewDisplayed='auto'    // true/false/undefined
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'gym',//'food',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          })
        }}
        query={{
          key: 'AIzaSyCxK0YIfvxlxJ8vocNVyDG_JScVf7SKG6w',//- API Google key. - AIzaSyCxK0YIfvxlxJ8vocNVyDG_JScVf7SKG6w
          language: 'en',
          components: "country:il",
          //	types:"establishment",
          radius: 10000,
          location: `${Number(region.latitude)}, ${Number(region.longitude)}`
        }}
        styles={{ container: { flex: 0, position: 'absolute', top: '6.4%', width: '100%', zIndex: 1 } }}
       // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
     //nearbyPlacesAPI="GooglePlacesSearch"

      />
      {location && <><MapView
        loadingEnabled={true}
        style={{ flex: 0.9,top:'1%'}}
        initialRegion={{
          latitude: Number(location.coords.latitude),//32.166313,
          longitude: Number(location.coords.longitude),//34.843311,
          latitudeDelta: 0.0125,
          longitudeDelta: 0.0121,
        }}

        // *** if turn on the location will return every secend.
        // onUserLocationChange={(e)=>{console.log("onUserLocationChange",e.nativeEvent)
        // setRegion({  latitude: e.nativeEvent.coordinate.latitude,
        //   longitude: e.nativeEvent.coordinate.longitude,
        //   latitudeDelta:  0.0125,
        //   longitudeDelta: 0.0121})
        // }}

        showsUserLocation={true}
        showsMyLocationButton={true}
        //nearbyPlacesAPI="GooglePlacesSearch"
        //onRegionChangeComplete={(region)=>{setRegion(region)}}
        provider='google'  //--> By delete this line, the maps provider will be Apple
      >


        <Marker
          coordinate={region}
          title="I'm Here !" />
        <Marker
          coordinate={pin}
          pinColor='blue'
          draggable={true}
          onDragStart={(e) => { console.log("Drag start:", Number(e.nativeEvent.coordinate)); }}
          onDragEnd={(e) => {
            setPin({
              latitude: Number(e.nativeEvent.coordinate.latitude),
              longitude: Number(e.nativeEvent.coordinate.longitude)
            })
          }}>

          <Callout>
            <Text>I Want to be Here!</Text>
          </Callout>

        </Marker>
        <Circle
          center={region}
          radius={distance}
        />
        <TouchableOpacity
          style={styles.info}
          onPress={() => setShow(!show)}
        >
          <SimpleLineIcons name="info" size={28} color="black" />
        </TouchableOpacity>

      </MapView>
              <View style={{ alignSelf: 'flex-start', position: 'absolute', top: '13%', width: '38%', height: '15%' }}>
              <Input
                label='Radius:'
                placeholder={'How many KM?'}
                placeholderTextColor='black'
                keyboardType='numeric'
                getValue={(value) => value ? setDistance(parseFloat( value )* 1000 / 2) : setDistance(0)}   
              />
            </View></>
      }

      {show ?
        <PopUp
          setShow={(show) => setShow(show)}
          width={80}
          height={60}
          element={
            <>
              <SimpleLineIcons name="info" size={28} color="black" zIndex='1'/>
              <Text style={{ marginBottom: '10%',marginTop:'5%', fontWeight: 'bold',}}> Instructions : </Text>
              <Text style={{ textAlign:'left'}}>
                {`1.Location must be Active for use this page!
              \n(if it doesn't work go to setting-> expo-> location-> active your location)
              \n2.You can hold the pin and drag it to where ever you wanna be
              \n3.Circle will apper after writing number for distance in the 'Radius' bar
              \n4.Search bar by google will help you find near by locations
              \n5.Don't give up, help your body first in order to help yourself!`}
              </Text>
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
  info: {
    alignItems: 'flex-end',
    paddingTop: '5.5%',
    paddingRight: '2%'

  },
});