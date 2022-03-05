import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigtor from '../Routes/Navigtor';
import {loginHook,UserContext} from './UserDetailsHook'




export default function Global() {
  const {userDetails, setUserDetails} = loginHook();
  


  return (
    <UserContext.Provider value={{userDetails,setUserDetails}}>
      <Navigtor/>
    </UserContext.Provider>
  )
}


//to see what virable is inside local storage

// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });