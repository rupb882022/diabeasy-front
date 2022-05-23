import React from 'react'
import Navigtor from './Routes/Navigtor';
import {loginHook,UserContext} from './CTools/UserDetailsHook'




export default function DiabesyApp({openDrawer}) {

  
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