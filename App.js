import { StyleSheet, View, ImageBackground } from 'react-native';
import {ImageUri} from './Routes/Url'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DiabesyApp from './DiabesyApp';

export default function App() {
    //style of the drawer
    const Theme = {
      colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
          primary: '#ff650d',
      },
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri:ImageUri+'backimg.png'}} resizeMode='cover' style={styles.image}>
      <NavigationContainer theme={Theme}>
        <DiabesyApp />
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