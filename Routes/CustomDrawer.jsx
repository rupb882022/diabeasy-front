import { View, Text, Image, StyleSheet } from 'react-native';
import React,{useContext} from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {ImageUri} from './Url';
import {UserContext} from '../CTools/UserDetailsHook'


export default function CustomDrawer(props) {

    const { navigation} = props
    const {userDetails,setUserDetails} = useContext(UserContext);

    
     const image = userDetails&&userDetails.image ? <Image source={{uri:ImageUri+userDetails.image}} style={styles.image} /> :
                                      <Image source={require('../images/profile_pictur.jpeg')} style={styles.image} />


const changePic=()=>{
    if (userDetails.id % 2 == 0) {
        navigation.navigate('CameraUse',{imageName:`profileDoctor${userDetails.id}`})
    }
    else{navigation.navigate('CameraUse',{imageName:`profilePatient${userDetails.id}`})
}}

    

  

    return (
        <>
            <DrawerContentScrollView >
                <View style={styles.header}>
                 <TouchableOpacity 
                 onPress={changePic}
                 >
                  {image}
                  </TouchableOpacity>
                    <Text style={styles.text} >{userDetails&&userDetails.name?userDetails.name:''}</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </>
    );
}
const styles = StyleSheet.create({

    text: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: '5%',
        color:'white',
        alignSelf:'flex-end',
        padding:'4%',
        textShadowColor: '#1ea6d6',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    image: {
        width: 78,
        height: 80,
        borderRadius: 1000,
        alignSelf: 'flex-start',
        // marginTop: '10%',
        padding:'5%',
        margin:'5%',
        borderColor: "white",
        borderWidth: 2
    },
    header: {
        backgroundColor: "#54BCC0",
        marginBottom: '2%',
        width: '100%',
        paddingTop: '5%',
        paddingBottom: '5%',
        flexDirection:'row'
    }
}

)