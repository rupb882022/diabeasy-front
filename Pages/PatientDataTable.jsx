import { StyleSheet, Text, View, ScrollView } from 'react-native'
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
import { AntDesign } from '@expo/vector-icons';

export default function PatientDataTable({ navigation }) {
  const { userDetails } = useContext(UserContext);

  const [a1c, setA1c] = useState(7.3)
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState()
  const [content, setContent] = useState()
  const [fromDate, setFromDate] = useState(moment(new Date(new Date().setDate(new Date().getDate() - 7))).format('YYYY-MM-DD'))
  const [toDate, setToDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

  useFocusEffect(
    React.useCallback(() => {
      //  console.log(userDetails); 
      if (userDetails.id % 2 == 0 && userDetails.patientID || userDetails.id % 2 != 0 && !userDetails.patientID) {

        getData();
        //loading&&setLoading(false)
        // console.log('1');
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
    setLoading(true)
    let id;
    if (userDetails.patientID) {// if its doctor with selected patient
      id = userDetails.patientID;
    }
    else if (userDetails.id % 2 != 0) {  // if its patient (=> not a doctor without selected patient)
      id = userDetails.id
    }

    Get_Table_Data(id, fromDate, toDate).then((result) => {
      setLoading(false)
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


  const CONTENT = {
    tableHead: ['Date and time', 'Blood sugar', 'Injection value', 'Carbs value', 'Injection spot'],
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
  const handleResult = (result) => {
    let arr = [];
    result.map((x, i) => {
      arr.push([moment(x.date_time).format('DD/MM/YY - H:mm'), x.blood_sugar_level, x.value_of_ingection, x.totalCarbs?x.totalCarbs:0, x.injection_site])
    })
    setContent(arr)
  }
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
            onPress={() => getData()}
          />
        </View>
      </View>
      <View style={{ flex: 3 }}>
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

});