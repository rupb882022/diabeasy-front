import { StyleSheet, View, ImageBackground } from 'react-native';
import {ImageUri} from './Routes/Url'
import { NavigationContainer, DefaultTheme,DrawerActions } from '@react-navigation/native';
import DiabesyApp from './DiabesyApp';
import React from 'react';


export const navigationRef = React.createRef();
// const openDrawer=()=> {
//     const temp=navigationRef.current.dispatch(DrawerActions.openDrawer());
//     console.log("temp",temp)
//   }
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
      <ImageBackground source={{uri:ImageUri+'backimg2.png'}} resizeMode='cover' style={styles.image}>
      <NavigationContainer theme={Theme}
      // ref={navigationRef}
      >
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
    // backgroundColor:'#d6f2fc',
    
  }
});

// console.log("keyboardStatus",keyboardStatus)
//       useEffect(() => {
//         const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
//           setKeyboardStatus(true);
//         });
//         const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
//           setKeyboardStatus(false);
//         });

//         return () => {
//           showSubscription.remove();
//           hideSubscription.remove();
//         };
//       }, []);