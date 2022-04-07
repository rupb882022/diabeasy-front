import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ScrollView } from 'react-native-web';
import Header from '../CTools/Header';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import Alert from '../CTools/Alert';
import { UserContext } from '../CTools/UserDetailsHook';
import upiUrl from '../Routes/Url';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';


export default function PatientDataTable({navigation}) {
const {userDetails} = useContext(UserContext);

const [a1c,setA1c]=useState(7.3)
const [loading, setLoading] = useState(false);
const [alert, setAlert] = useState()
const [content,setContent]=useState()

useFocusEffect(
  React.useCallback(() => {
  //  console.log(userDetails);
     if (userDetails.id%2==0&&userDetails.patientID||userDetails.id%2!=0&&!userDetails.patientID) {

    getData();
    //loading&&setLoading(false)
   // console.log('1');
  }
else if(userDetails.id%2==0&&!userDetails.patientID){setContent([]);
  setAlert(
  <Alert text="Need to choose patient to watch his data"
  type='worng'
  time={5000}
  bottom={400}
  />)}
}, [userDetails])
);

// useEffect(()=>{
// getData();
// },[])


  const getData=()=>{
  setLoading(true)
  let url;
if (userDetails.patientID) {        // if its doctor with selected patient
  url=upiUrl + `User/GetdataForTable/${userDetails.patientID}`;
} 
else if(userDetails.id%2!=0){            // if its patient (=> not a doctor without selected patient)
url=upiUrl + `User/GetdataForTable/${userDetails.id}`;
}  
console.log('url=> ',url);
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'appliction/json; charset=UTF-8',
            'Accept': 'appliction/json; charset=UTF-8'
        })
    }).then(res => {
      console.log("res=> ",res.status);
        if (res && res.status == 200) {
            return res.json();} 

        else {
            console.log("status code:", res.status)
            setLoading(false)
            return;
        }
    }).then((result) => {
      setLoading(false)
      //console.log('results=>', result);
      handleResult(result)
  
     // console.log('3');
    },
        (error) => {
            console.log("error", error)
            setAlert(
              <Alert text="sorry, somthing went wrong, please try again later"
              type='worng'
              time={2000}
              bottom={110}
              />);
           setLoading(false)
        }) 

      }

const handleResult=(result)=>{
let arr= [];
result.map((x,i)=>{
arr.push([moment(x.date_time).format('DD/MM/YY - H:mm'),x.blood_sugar_level,x.value_of_ingection,x.totalCarbs,x.injection_site])
})
setContent(arr)
}

  const CONTENT = {
    tableHead: ['Date and time', 'Blood sugar level', 'Injection value', 'Carbs value','Injection spot'],
    tableData: content,
  };
      // ['01/01/20','1', '2', '3','belly'],
      // ['02/01/20','a', 'b', 'c','arm'],
      // ['03/01/20','1', '2', '3','belly'],
      // ['04/01/20','a', 'b', 'c','arm'],
      // ['05/01/20','1', '2', '3','belly'],
      // ['07/01/20','a', 'b', 'c','arm'],
      // ['85/01/20','1', '2', '3','belly'],
      // ['10/01/20','a', 'b', 'c','arm'],
      // ['01/01/20','1', '2', '3','belly'],
      // ['16/01/20','a', 'b', 'c','arm'],
      // ['71/01/20','1', '2', '3','belly'],
      // ['41/01/20','a', 'b', 'c','arm'],
      // ['16/01/20','a', 'b', 'c','arm'],
      // ['71/01/20','1', '2', '3','belly'],
      // ['41/01/20','a', 'b', 'c','arm'],
   


    return (
      <View style={styles.container}> 
<Header
title='Repotrs'
flex={userDetails.id%2==0?0.5:0.8}
possiton={62}
paddingRight={5}/>
                                     {/* TO DO -function from serverside for set A1C parameter  */}
<Text style={{alignSelf:'center',paddingBottom:'4%',fontSize:20,fontWeight:'bold'}}>Estimated A1C Value : {a1c}% </Text> 
   <View style={{flex:3}}>
       <Table  borderStyle={{ borderWidth: 1 }} >
         <Row
           data={CONTENT.tableHead}
           flexArr={[1.8, 1, 1, 1,1]}
           style={styles.head}
           textStyle={styles.text}
         />
         <TableWrapper style={styles.wrapper}>
          {/* <Col
          data={CONTENT.tableData[0]}
          style={styles.title}
          heightArr={[20, 20]}
          textStyle={styles.text}
           /> */}
           <Rows
             data={CONTENT.tableData}
           flexArr={[1.8,1, 1, 1]}
             style={styles.row}
             textStyle={styles.text}
           />
         </TableWrapper>
       </Table> 
       </View>
{userDetails.id%2==0?<></>:
       <Button
       text='Add'
       justifyContent='center'
       alignItems='center'
       width={10}
       height={3}
       onPress={()=>navigation.navigate('Insert Data')}
      />
}
      {loading && <Loading />}
   {alert&&alert}    
</View>
   );
  
}


const styles = StyleSheet.create({
  container: { flex: 10},
  head: { height: 40, backgroundColor:'orange' },//'#rgba(32,189,215,1)'}, =>blue color like in figma  
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: 'lightblue' },
  row: { height: 28 },
  text: { textAlign: 'center' },
});