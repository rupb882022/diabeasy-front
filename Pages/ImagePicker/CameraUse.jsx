import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '../../CTools/Button';
import { Feather } from '@expo/vector-icons'; 


export default function CameraUse(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      //TODO cheack if premission can be save in DB
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <></>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
<TouchableOpacity onPress={()=>navigation.goBack()} style={styles.X}>
<Feather name="x" size={24} color="black" />
</TouchableOpacity>
      </Camera>
      <View style={styles.buttonContainer}>


          <Button
          justifyContent='flex-end'
          alignItems='flex-start'
          text='flip'
          radios={1000} 
          width={6.5}
          height={7}
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}/>
          <Button
          text='Pic'
         radios={1000} 
         width={6.5}
         height={7}
          justifyContent='flex-end'
          alignItems='center'
            style={styles.button2}
            onPress={async () => {
              if (camera) {
              const data = await camera.takePictureAsync(null);
              console.log(data.uri)
              //setPicUri(data.uri);
              }
              }}/>
           <Button
          text='Pic'
         radios={1000} 
         width={6.5}
         height={7}
          justifyContent='flex-end'
          alignItems='flex-end'
            style={styles.button2}
            onPress={async () => {
              if (camera) {
              const data = await camera.takePictureAsync(null);
              console.log(data.uri)
              //setPicUri(data.uri);
              }
              }}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
   
  },
  buttonContainer2:{
  marginBottom:10,
  marginRight:10,
alignItems:'flex-end'},
  button: {
   // flex: 0.2,
  },
  X: {
  alignItems:'flex-end',
paddingTop:'15%',
paddingRight: '5%'
}
});
