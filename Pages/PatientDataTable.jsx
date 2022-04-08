import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Header from '../CTools/Header';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import Alert from '../CTools/Alert';
import { UserContext } from '../CTools/UserDetailsHook';
import upiUrl from '../Routes/Url';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Input from '../CTools/Input';
import { AntDesign } from '@expo/vector-icons';

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
      console.log("resTable=> ",res.status);
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

<View style={{flex:0.1,position:'relative',bottom:'5%',
    justifyContent:'space-around',
    flexDirection: 'row',
   }}>
<Input
                popup_title='Your Birth Date'
                label='From:'
                type='date'
                mode='date'
                min={new Date(1920, 1, 1)}
                editable={false}
                display='spinner'
                date_format_hour={false}
                width={100}
                height={150}
                flex={0.4}
              //  required={true}
              //  setValue={birthDate}
              //  getValue={(value) => {setDate(value)}}
            />
            <Input
                popup_title='Your Birth Date'
                label='To:'
                type='date'
                mode='date'
                min={new Date(1920, 1, 1)}
                editable={false}
                display='spinner'
                date_format_hour={false}
                width={100}
                height={150}
                flex={0.4}

              //  required={true}
              //  setValue={birthDate}
              //  getValue={(value) => {setDate(value)}}
            />
<View >
<Button
width={6}
height={6}
radius={5}
textSize={14}
element={<AntDesign name="search1" size={14} color="white" />}
alignItems='flex-end'
//  onPress={()=>{Serch_food_by_name()}}
/>
</View>
            </View>
   <View style={{flex:3}}>
       <Table  borderStyle={{ borderWidth: 1 }} >
         <Row
           data={CONTENT.tableHead}
           flexArr={[1.8, 1, 1, 1,1]}
           style={styles.head}
           textStyle={styles.text}
         />  
         </Table> 
         <ScrollView style={styles.dataWrapper}>
         <Table  borderStyle={{ borderWidth: 1 }} >
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
       </ScrollView>
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
  dataWrapper: { marginTop: -1 },

});