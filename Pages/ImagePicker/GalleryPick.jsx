import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import Button from '../../CTools/Button';
import { Ionicons } from '@expo/vector-icons';

export default function GalleryPick() {
  const [image, setImage] = useState(null);

  //waiting for permision
  useEffect(() => {
    (async ()=>{
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     // console.log(status);
      if (status !== 'granted') {
        console.log(status);
        alert('permission denied!')
      }
    }
  })
  }, [])

  //choose *only* picture
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pic} onPress={PickImage}>
        {image ? <Image source={{ uri: image }} style={styles.img} /> : <></>}
        <View style={styles.icon}><Ionicons name="camera-reverse-outline"  size={35}  /></View>
        <Text style={{alignSelf: 'center',justifyContent:'flex-start' }}>Tap To Edit </Text>
      </TouchableOpacity>
      <Button text='go to gallery'
        onPress={PickImage}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 1000,
  },
  pic: { justifyContent: 'center', flex: 1 },
  button: { justifyContent: 'flex-end' },
  icon: { justifyContent:'flex-start',alignSelf: 'center', backgroundColor: 'gray',borderRadius:1000,padding:'1%',position:'relative',bottom:'5%' }

});
