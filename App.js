import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Input from './CTools/Input';
import Button from './CTools/Button';
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/backimg.png')} resizeMode='cover' style={styles.image}>
      <Input placeholder={"   inser email"}
                justifyContent='flex-end'
                width={70}
        />
        <Button
          btntext="click me"
          justifyContent='flex-start'
        />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%'
  }
});
