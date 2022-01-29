import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import Button from '../../CTools/Button';

export default function GalleryPick() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const { status } = ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('permission denied !')
      }
    }
  }, [])

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      //TODO check if there is only image opption, not vidoe files
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      <Button text='go to gallery'
        onPress={PickImage}
      />
      {image ? <Image source={{ uri: image }} style={styles.img} />:<></>}
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
  }

});
