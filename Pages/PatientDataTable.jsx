import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Header from '../CTools/Header';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import Alert from '../CTools/Alert';
import { UserContext } from '../CTools/UserDetailsHook';
import { Get_Table_Data } from '../Functions/Function'
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Input from '../CTools/Input';
import { AntDesign,Entypo } from '@expo/vector-icons';
import PopUp from '../CTools/PopUp';
import DeleteDataReportTable from './DeleteDataReportTable';
import UpdateDateReportTable from './UpdateDateReportTable';
import { Put_line_tableData } from '../Functions/Function';

export default function PatientDataTable({ navigation }) {
  const { userDetails } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState()
  const [content, setContent] = useState()
  const [fromDate, setFromDate] = useState(moment(new Date(new Date().setDate(new Date().getDate() - 7))).format('YYYY-MM-DD'))
  const [toDate, setToDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [showEdit, setShowEdit] = useState(false)
  const [time, setTime] = useState()
  const [update, setUpdate] = useState(false)
  const [sugarLevel, setSugarLevel] = useState()
  const [injectionValue, setinjectionValue] = useState()
  const [spot, setSpot] = useState()
  const [carbs, setCarbs] = useState();

  useFocusEffect(
    React.useCallback(() => {
      if (userDetails.id % 2 == 0 && userDetails.patientID || userDetails.id % 2 != 0 && !userDetails.patientID) {
        getData();
      }
      else if (userDetails.id % 2 == 0 && !userDetails.patientID) {
        setContent([]);
        setAlert(
          <Alert text="Need to choose patient to watch his data"
            type='worng'
            time={5000}
            bottom={400}
          />)
      }
    }, [userDetails])
  );

  const getData = () => {
   // setLoading(true) ----------------------------------------TO DO ------------- Fix Loading!!
    let id;
    if (userDetails.patientID) {// if its doctor with selected patient
      id = userDetails.patientID;
    }
    else if (userDetails.id % 2 != 0) {  // if its patient (=> not a doctor without selected patient)
      id = userDetails.id
    }

    Get_Table_Data(id, fromDate, toDate).then((result) => {  
      handleResult(result)
    },
      (error) => {
        console.log(error + " in function Get_Table_Data")
        setAlert(
          <Alert text="sorry, somthing went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={110}
          />);
        setLoading(false)
      })
  }

// colomns names
  const CONTENT = {
    tableHead: ['Date and time', 'Blood sugar', 'Injection value', 'Carbs value', 'Edit'],
    tableData: content,
  };


  const setDates = (value, i) => {
    if (value) {
      let date;
      if (value.includes("/")) {
        date = value.split("/");
        date = `${date[2]}-${date[1]}-${date[0]}`
      }
      else {
        date = value;
      }
      i == 1 ?
        setFromDate(date) : setToDate(date)
    }
  }
  // insert data from 'GET' into the table
  const handleResult = (result) => {
    let arr = [];
    result.map((x, i) => {
      arr.push([moment(x.date_time).format('DD/MM/YY - H:mm'), x.blood_sugar_level, x.value_of_ingection?x.value_of_ingection:0, x.totalCarbs?x.totalCarbs:0,
      <Button key={i} color='transparent' onPress={()=>{setSugarLevel(x.blood_sugar_level?x.blood_sugar_level:0);setTime(x.date_time);setinjectionValue(x.value_of_ingection?x.value_of_ingection:0);setSpot(x.injection_site?x.injection_site:'');setCarbs(x.totalCarbs?x.totalCarbs:0);setShowEdit(true)}}
       alignItems='center' 
       width={14}
      height={1} 
      element={<Entypo name="dots-three-horizontal" size={24} color="black" />}/> ])
    })
    setContent(arr)
    setLoading(false)
  }   

  // 'PUT' method - update data
const saveDetails = ()=>{
  let details={
    date_time: time,
    blood_sugar_level: sugarLevel,
    injection_site: spot,  
    totalCarbs:carbs,
    injectionType:carbs? 'food' : injectionValue ? 'fix' : 'no-injection',
    value_of_ingection:injectionValue,
    Patients_id:userDetails.id
  }
  Put_line_tableData(details).then((response) => {  
    update&&setUpdate(false) 
    response && getData();
  })
    .catch((error) => {
      setAlert(
        <Alert text="sorry, somthing went wrong, please try again later"
          type='worng'
          time={2000}
          bottom={110}
        />)
        update&&setUpdate(false)
      console.log("error in function Put_line_tableData " + error);
    });

}

let updatePopup =<>
 <PopUp
  backgroundColor="#bbe4f2"
  height='50%'
  width='70%'
  isButton={false}
  element={<View style={{flex:1}}>
    <Text style={styles.titlePopup}>Edit</Text>
  <View style={{marginTop:'20%',}} >
     <Input
           popup_title='Date and Time to edit'
           label='Date and time to edit'
          // type='date'
           editable={false}
           width='150%'
           height='50%'
           placeholder={moment(time).format("DD/MM/YYYY H:mm")}
           placeholderTextColor='black'
       />
       <Input
           label='Blood sugar level'
           placeholder={sugarLevel?`${sugarLevel}`: '0'}
           keyboardType='number-pad'
           max={600}
           required={true}
           width='150%'
           height='50%'
           getValue={(value) => setSugarLevel(value)}
           setValue={sugarLevel}
       />
       <Input
         label='injection value'
         placeholder={injectionValue?`${injectionValue}`:'0'}
         width='150%'
         height='50%'    
         keyboardType='decimal-pad'
         getValue={(value) => setinjectionValue(value)}
         setValue={injectionValue}
       />
       {/* ToDo -------------------------------- fix label spot injection to outside the page range */}
       <Input
           label='Spot of injection'
           placeholder={spot?spot:'none'}
           editable={false}
           type='selectBox'
           width='150%'
           height='50%'
           getValue={(value) => { console.log('v',value);value=='No injection'?setSpot():value&&setSpot(value)}}
           SelectBox_placeholder='Select spot of injection'
           selectBox_items={[
               { itemKey: 0, label: 'Arm', value: 'Arm' },
               { itemKey: 1, label: 'Belly', value: 'Belly' },
               { itemKey: 2, label: 'Leg', value: 'Leg' },
               { itemKey: 3, label: 'Buttock', value: 'Buttock' },
               { itemKey: 4, label: 'No injection', value: 'No injection' },
           ]} />
           <Input
           label='Carbs'
           width='150%'
           height='50%'
           keyboardType='decimal-pad'
           getValue={(value) => setCarbs(value)}
           placeholder={carbs? `${carbs}`:'0'}
           setValue={carbs}
       />
       <View style={{flex:0.8,flexDirection:'row',marginTop:'5%'}}>
         <Button
            text="save"
            width={10}
            height={10}
            justifyContent='flex-start'
            onPress={()=>{
             time&&sugarLevel&&
             saveDetails();
             }}
        />
        <Button
            text="cancle"
            width={10}
            height={10}
           //alignItems='flex-end'
           // justifyContent='flex-end'
            onPress={()=>setUpdate(false)}
        />
        
        </View>
          
           </View>
          
  </View>}
  /></>
  return (
    <View style={styles.container}>
      <Header
        title='Repotrs'
        flex={userDetails.id % 2 == 0 ? 0.5 : 0.8}
        possiton={62}
        paddingRight={5} />

      <View style={{ flex: 0.2, position: 'relative', bottom: '5%', justifyContent: 'space-around', flexDirection: 'row', }}>
        <Input
          popup_title='From Date'
          label='From date:'
          placeholder={moment(fromDate).format('DD/MM/YYYY')}
          type='date'
          mode='date'
          min={new Date(1920, 1, 1)}
          editable={false}
          display='spinner'
          date_format_hour={false}
          width={100}
          height={100}
          flex={0.4}
          required={true}
          //setValue={fromDate}
          getValue={(value) => { setDates(value, 1) }}
        />
        <Input
          popup_title='To Date'
          label='To date:'
          type='date'
          mode='date'
          min={new Date(1920, 1, 1)}
          editable={false}
          display='spinner'
          date_format_hour={false}
          width={100}
          height={100}
          flex={0.4}
          placeholder={moment(toDate).format('DD/MM/YYYY')}
          required={true}
          // setValue={toDate}
          getValue={(value) => { setDates(value, 0) }}
        />
        <View style={{ flex: 0.15, paddingRight: '2%' }} >
          <Button
            width={15}
            height={10}
            radius={5}
            //textSize={14}
            element={<AntDesign name="search1" size={14} color="white" />}
            alignItems='flex-end'
            onPress={() => {getData();}}
          />
        </View>
      </View>
      <View style={{ flex: 3,backgroundColor: '#ffffffa8', }}>
        <Table borderStyle={{ borderWidth: 1 }} >
          <Row
            data={CONTENT.tableHead}
            flexArr={[1.8, 1, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1 }} >
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={CONTENT.tableData}
                flexArr={[1.8, 1, 1, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
      {userDetails.id % 2 == 0 ? <></> :
        <Button
          text='Add'
          justifyContent='center'
          alignItems='center'
          width={10}
          height={3}
          onPress={() => navigation.navigate('Insert Data')}
        />
      }
      {loading && <Loading />}
      {alert && alert}
      {showEdit && userDetails.id%2!=0 &&
      <PopUp
        animationType='fade'
        isButton={false}
        backgroundColor='#FCEBD6'
        height={18}
        width={40}
        element={<View style={{flex:3,width:'100%',alignSelf:'center',alignItems:'center'}}>
      <UpdateDateReportTable 
      setShowEdit={()=>{setShowEdit(false);setUpdate(true)}}
      />
      <DeleteDataReportTable 
      time={time.replace(":","!").replace(":","!")}
      getData={getData}
      setShowEdit={()=>setShowEdit(false)}
      />
     
      <TouchableOpacity style={styles.textEdit} onPress={()=>setShowEdit(false)}><Text>Cancle</Text></TouchableOpacity>
       </View>}/>}
       {update&&userDetails.id%2!=0 && updatePopup}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,padding:'2%' },
  head: { height: 40, backgroundColor: '#FFCF84' },//'#rgba(32,189,215,1)'}, =>blue color like in figma
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: 'lightblue' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  textEdit:{
  backgroundColor: '#F9AC27',
  width: '130%',
  flex: 1,
  justifyContent: 'center',
  marginTop: '2%',
  alignItems:'center'
},
titlePopup: {
  fontSize: 30,
  width: '70%',
  height: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'white',
  textShadowColor: '#1EA6D6',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
  justifyContent: 'flex-start',
  alignSelf:'center',
 // alignItems: 'flex-end',
 // flex: 3,
 position:'absolute',

}
 
});