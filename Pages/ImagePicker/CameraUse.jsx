import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '../../CTools/Button';

export default function CameraUse(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>

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
              {/* </View>
              <View style={styles.buttonContainer2}> */}
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
           {/* <Text style={styles.text}> Flip </Text> */}
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
    //backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent:'center',
    // marginBottom:10,
    // marginLeft:10,
    alignItems:'center'
   
  },
  buttonContainer2:{
    //flex:0.5,
    //justifyContent:'flex-end',
  marginBottom:10,
  marginRight:10,
alignItems:'flex-end'},
  button: {
   // flex: 0.2,
  },
  // text: {
  //   fontSize: 18,
  //   color: 'white',
  // },
});
