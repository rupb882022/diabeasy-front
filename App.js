import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Input from './CTools/Input';
import Button from './CTools/Button';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes/Routes';
import InsertData from './Pages/InsertData'
import Home from './Pages/Home'

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <ImageBackground source={require('./images/backimg.png')} resizeMode='cover' style={styles.image}>
       <InsertData/>
       
        </ImageBackground>
      </View>
    </NavigationContainer>
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
    width: '100%'
  }
});
