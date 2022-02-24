import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import Button from '../../CTools/Button';
import { Ionicons } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';

export default function Gallery(props,{navigation}) {
  const {description=true, picUri,show ,setShow}=props

  
  //let urlImage = props.route.params.urlImage;

  const [image, setImage] = useState(picUri);

  //waiting for permision
  useEffect(() => {
      // {picUri!=null? setImage(picUri):<></>}
    (async ()=>{
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    console.log('res=>',result);
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  //const sendData =(image)=>{navigation.navigate('PersonalInfo1')}
//{picUri!=null? setImage(picUri):<></>}
//Todo change icon
 return (
<>
<PopUp style={styles.container}
setShow={(isShow)=>setShow(isShow)}
width={100}
height={100}
element={ 
  <>    
    <Text style={styles.title()}> {'Profile picture'}</Text>
<TouchableOpacity style={styles.pic} onPress={PickImage}>
        {image==null ?
         <Image style={styles.img} source={require('../../images/blankProfilePicture.png')}/>: 
          <Image style={styles.img} source={{uri:image}}  /> }        
        <View style={styles.icon}><Ionicons name="camera-reverse-outline"  size={25}  /></View>
        {description&&<Text style={{alignSelf: 'center',justifyContent:'flex-start' }}>Tap To Edit </Text>}
      </TouchableOpacity>

<Button text='DONE'
style={styles.button}
// onPress={() => navigation.navigate({name:'PersonalInfo1',imageUrl:image})}
//onPress={()=> {image!=null? sendData(image): alert('picture not selected')}}
/> 
</>
}
button_txt='Cancle'
backgroundColor="#bbe4f2"
button_height='4'
/>
 </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    height: 250,
    width: 250,
    borderRadius: 1000,
    
  },
  pic: { justifyContent: 'center', flex: 1,marginBottom:'30%' },
 button: {  },
  icon: { justifyContent:'flex-start',alignSelf: 'center',borderRadius:1000,padding:'1%',position:'relative',bottom:'1%' },
  title: (paddingRight =0, title_size = 30) => {
    return {
    fontSize: title_size,
      width: '70%',
      height: '100%',
      textAlign: 'center',
      paddingRight: paddingRight + '%',
      paddingTop: '20%',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: '#1EA6D6',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      justifyContent:'flex-start',
      alignItems:'flex-end',
      flex:0.8,

    }
  },
});
