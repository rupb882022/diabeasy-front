import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext, createContext } from 'react';
import Button from '../../CTools/Button';
import Header from '../../CTools/Header';
import Loading from '../../CTools/Loading';
import { UserContext } from '../../CTools/UserDetailsHook'
import { ImageUri } from '../../Routes/Url';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CreatePatientForDoctor from './CreatePatientForDoctor';
import upiUrl from '../../Routes/Url';

export default function DoctorHome(props) {
const {userDetails,setUserDetails} = useContext(UserContext);
//const [click,setClick]=useState(false)
const [loading, setLoading] = useState(false);
const [patients,setPatients]=useState([])
const [element,setElement]=useState()

useEffect(()=>{
// setLoading(true)
//console.log(upiUrl + `User/Doctor/${userDetails.id}`);
      fetch(upiUrl + `User/Doctor/${userDetails.id}`, {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'appliction/json; charset=UTF-8',
              'Accept': 'appliction/json; charset=UTF-8'
          })
      }).then(res => {
        console.log("res=> ",res.status);
          if (res && res.status == 200) {
              return res.json();
          } else {
              console.log("status code:", res.status)
           //   setLoading(false)
              return;
          }
      }).then((result) => {
       console.log('result=>', result);
        setPatients(result)
      //  setLoading(false)
      },
          (error) => {
              console.log("error=>", error)
             // setLoading(false)
          })
},[])

 
        
        


// const json=[
//   {"id":1,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":3,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":5,"firstname":"gal","lastname":"ochayun","profileimage":"","select":false},
//   {"id":7,"firstname":"tal","lastname":"farkash","profileimage":"profileDoctor2.jpg","select":false},
//   {"id":9,"firstname":"idan","lastname":"lavee","profileimage":"","select":false},
//   {"id":11,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":13,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":15,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":17,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":19,"firstname":"tal","lastname":"farkash","profileimage":"","select":false},
//   {"id":21,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":23,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":25,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":27,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":29,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":31,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":33,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":35,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":37,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":39,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":41,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   {"id":43,"firstname":"tal","lastname":"farkash","profileimage":"profilePatient1.jpg","select":false},
//   {"id":45,"firstname":"idan","lastname":"lavee","profileimage":"profilePatient3.jpg","select":false},
//   {"id":47,"firstname":"gal","lastname":"ochayun","profileimage":"profilePatient5.jpg","select":false},
//   ]






useEffect(()=>{
let element= patients.map((p,i)=>
<CreatePatientForDoctor
key={i}
p={p}
whileClick={whileClick}
//setPatients={setPatients()}
/>)
setElement(element)}
,[patients])

//const [color,setColor]=useState(styles.imageWhite)

//const clickCurrentPatient=(id)=>{
 // console.log('id-',p.id  );
 //let Patient = patients.find(x=>x.id==id)
 //Patient.select=true;
//setColor(styles.imageWhite(color))}

const whileClick=(id)=>{
  //console.log("id",id);

  let select=false;

//select is present the x.select- it will handel with  patientID(true/false)
let arr= patients.map(x=> {
if (x.id!=id) {
   x.select=false
} 
else{
x.select=!x.select; select=x.select }
return x}) 
//console.log('arr',arr);
setPatients(arr)

let temp=select?Object.assign({},userDetails,{patientID:id}):Object.assign({},userDetails,{patientID:null})// patient id already added to userdetails by press on patient circle
setUserDetails(temp);
}






return(
<View style={styles.container}>
<Header
   title='Home'
   logo_image='heart'
   flex={0.2}
  image_width={50}
  image_heigt={50}
   paddingRight={9}
   possiton={50}
   image_margin={{ Bottom: 5}}
 />
 
<ScrollView style={{flex:0.1}} >
<View style={styles.viewContainer}>
{element&&element}
</View>
</ScrollView>
{loading&&<Loading />}
</View>

);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  //    alignItems:'flex-start'
  },
  viewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    //flex: 1,
},

// imageGreen: {
//   width: 78,
//   height: 80,
//   borderRadius: 1000,
//   //alignSelf: 'flex-start',
//    marginTop: '10%',
//   //padding:'5%',
//   marginLeft:'5%',
//   borderColor: "#0BFF5C",
//   borderWidth: 6
// },
})

