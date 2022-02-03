import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes/Drawer';
import InsertData from './Pages/InsertData'
import Home from './Pages/Home'
import PersonalInfo1 from './Pages/PersonalInfo1';
import PersonalInfo2 from './Pages/PersonalInfo2';
import PatientLogin from './Pages/PatientLogin';
import CameraUse from './Pages/ImagePicker/CameraUse';
import GalleryPick from './Pages/ImagePicker/GalleryPick';
import Drawer from './Routes/Drawer';



export default function App() {


  return (

      <View style={styles.container}>
        <ImageBackground source={require('./images/backimg.png')} resizeMode='cover' style={styles.image}>
        <Drawer/>
            {/* <InsertData/> */}
            {/* <PersonalInfo1  /> */}
            {/* <PersonalInfo2/> */}
            {/* <PatientLogin/> */}
            {/* <CameraUse/> */}
            {/* <Gall eryPick/> */}

        </ImageBackground>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  }
});
