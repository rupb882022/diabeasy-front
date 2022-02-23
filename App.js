import { StyleSheet, View, ImageBackground } from 'react-native';
import Drawer from './Routes/Drawer';
import PatientLogin from './Pages/PatientLogin'
import PersonalInfo1 from './Pages/PersonalInfo1'
import SignUp from './Pages/SignUp';
import GalleryPick from './Pages/ImagePicker/GalleryPick'
import Maps from './Pages/Maps';
import TabNav from './Routes/TabNav';

export default function App() {

  return (

    <View style={styles.container}>
      <ImageBackground source={require('./images/backimg.png')} resizeMode='cover' style={styles.image}>
        <Drawer/>
        {/* <PatientLogin/> */}
        {/* <SignUp/> */}
        {/* <PersonalInfo1/> */}
      {/* <GalleryPick/> */}
      {/* <Maps/> */}
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
