import {Alert, View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import Button from '../../CTools/Button';
import { Ionicons } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';
import upiUrl from '../../Routes/Url';
export default function Gallery(props) {
  const {description=true, picUri,show ,setShow,navigation,imageName}=props

  
  //let urlImage = props.route.params.urlImage;

  const [image, setImage] = useState(picUri);
  //const [picDetails,setPicDetails]=useState(picData)
  //const [counter,setCounter]=useState(0)
  //waiting for permision
  useEffect(() => {
    (async ()=>{
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log(status);
        Alert.alert('oops..','permission denied!')
      }
    }
  })
  }, [])

  //useEffect(()=>{console.log('123=>',image)},[])
  
  //choose *only* picture
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    })
    console.log('ImagePicker=>',result);
    if (!result.cancelled) {
      setImage(result.uri)
      //setPicDetails(result)
    }
  }
////***************** */
const btnImgUpload=()=>{

console.log('waiting for answer: ');
ImgUpload(`${image}`
   , imageName)
   
}


//#Nir check (!Request.Content.IsMimeMultipartContent()) in C#
const ImgUpload = (imgUri, picName) => {
  let dataI = new FormData();
  dataI.append('picture', {
  uri: imgUri,
  name: picName,
  type: 'image/jpg'
  });
  const config = {
    method: 'POST',
    body: dataI,

    }
    console.log(upiUrl+"uploadpicture")
    console.log(dataI)
    fetch(upiUrl+"uploadpicture", config)
    .then((res) => {
    if (res.status == 201) {console.log('resstatus=>',res.status);return res.json(); }
    else {console.log(res.status);return res.err;}
    })
    .then((responseData) => {
      console.log('responsData=>',responseData);
    if (responseData != "err") {
      
      console.log("picName",picName)
      console.log("responseData",responseData)
    let picNameWOExt = picName.substring(0, picName.indexOf("."));
    let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt),
    responseData.indexOf(".jpg") + 4);
    console.log(imageNameWithGUID);
    console.log("img uploaded successfully!");
    }
    else {alert('error uploding ...'); }
    })
    .catch(err => {console.log('err upload= ' + err); });
  }

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
onPress={btnImgUpload}

//onPress={() => {navigation.navigate('PersonalInfo1')}}
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
