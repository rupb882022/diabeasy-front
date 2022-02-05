import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '../../CTools/Button';
import { Feather, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';


export default function CameraUse(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [picUri, setPicUri] = useState('https://reactjs.org/logo-og.png');
  const [flashMode, setFlashMode] = useState('off')


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <></>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
//Flash Mode On/Off
  const handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    }
    else {
      setFlashMode('auto')
    }
  }


  return (
    <View style={styles.container}>
      <Camera flashMode={flashMode} style={styles.camera} type={type} ref={ref => setCamera(ref)}>
     <View style={styles.icons}>
  

        <TouchableOpacity onPress={handleFlashMode} style={styles.flash}>
          {flashMode === 'off' ?
            <Ionicons name="flash-off-outline" size={30} color="black" /> :
            <Ionicons name="flash-outline" size={30} color="black" />}
        </TouchableOpacity>  
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.X}>
          <Feather name="x" size={35} color="black" />
        </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.buttonContainer}>


        <Button
          justifyContent='flex-end'
          // alignItems='flex-start'
          element={<SimpleLineIcons name="refresh" size={30} color="black" />}
          radios={1000}
          width={10}
          height={10}
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }} />
        <Button
          element={<SimpleLineIcons name="camera" size={30} color="black" />}
          radios={1000}
          width={10}
          height={10}
          justifyContent='flex-end'
          // alignItems='center'
          style={styles.button}
          onPress={async () => {
            if (camera) {
              const data = await camera.takePictureAsync();
              console.log(data.uri)
              setPicUri(data.uri)
            };
            Vibration.vibrate(); //we can use vibration anywhere! 
          }} />

        <Button
          element={<AntDesign name="picture" size={30} color="black" />}
          radios={1000}
          width={10}
          height={10}
          justifyContent='flex-end'
          // alignItems='flex-end'
          style={styles.button}
        //onPress={}
        />
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
  icons:{   
    flexDirection: 'row',
    justifyContent:'space-between'

  },
  buttonContainer: {
    flex: 0.15,
    paddingLeft: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {

  },
  X: {
    alignItems: 'flex-end',
    paddingTop: '15%',
    paddingRight: '5%',
    justifyContent:'flex-end'
  },
  flash: {
    justifyContent: 'flex-start',
    paddingLeft: '5%',
    paddingTop:'15%'
  }
});
