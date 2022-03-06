import { StyleSheet, View, ImageBackground } from 'react-native';
import Drawer from './Routes/Drawer';
import Login from './Pages/Login'
import PersonalInfo1 from './Pages/PersonalInfo1'
import SignUp from './Pages/SignUp';
import GalleryPick from './Pages/ImagePicker/GalleryPick'
import Maps from './Pages/Maps';
import TabNav from './Routes/TabNav';
import {ImageUri} from './Routes/Url'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Navigtor from './Routes/Navigtor';
import Global from './CTools/Global';

export default function App() {
    //style of the drawer
    const Theme = {
      colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
          primary: '#ff650d',
      },
  };
console.log()
  return (

    <View style={styles.container}>
      <ImageBackground source={{uri:ImageUri+'backimg.png'}} resizeMode='cover' style={styles.image}>
      <NavigationContainer theme={Theme}>
        <Global />
        </NavigationContainer>
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