import { StyleSheet, View, ImageBackground } from 'react-native';
import Drawer from './Routes/Drawer';



export default function App() {


  return (

    <View style={styles.container}>
      <ImageBackground source={require('./images/backimg.png')} resizeMode='cover' style={styles.image}>
        <Drawer/>
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
