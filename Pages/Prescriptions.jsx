import { View, Text, StyleSheet, Image, ScrollView, Switch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Header from '../CTools/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../CTools/Button';
import PopUp from '../CTools/PopUp';
import Input from '../CTools/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../CTools/UserDetailsHook';
import { Get_Prescriptions, Delete_Prescriptions, Post_new_Prescription, Put_Prescription } from '../Functions/Function'
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Alert from '../CTools/Alert';
import * as Progress from 'react-native-progress';
import DeleteAlert from '../CTools/DeleteAlert';

export default function Prescriptions(props) {

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { userDetails } = useContext(UserContext);
  const [popupElement, setPopupElement] = useState();
  const [popupSubject, setPopupSubject] = useState(false);
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(false);
  const [reqValue, setReqValue] = useState(false);
  const [request, setRequest] = useState({});
  const [allSubjects, setAllSubjects] = useState();
  const [idForPrescription, setIdForPrescription] = useState();
  const [alert, setAlert] = useState()
  const [delAlert, setDelAlert] = useState(false)


  useFocusEffect(
    React.useCallback(() => {
      console.log(userDetails);
      if (userDetails.id % 2 == 0 && userDetails.patientID) {
        getPrescriptions();
      }
      else if (userDetails.id % 2 == 0 && !userDetails.patientID) {
        setPrescriptions([]);
        setAlert(
          <Alert text="Need to choose patient to watch his prescriptions"
            type='worng'
            time={5000}
            bottom={400}
          />)
      }
    }, [userDetails])
  );

  const getPrescriptions = () => {
    setLoading(true)
    let id;
    if (userDetails.patientID) {// if its doctor with selected patient
      id = userDetails.patientID;
    }
    else if (userDetails.id % 2 != 0) {// if its patient (=> not a doctor without selected patient)
      id = userDetails.id;
    }

    Get_Prescriptions(id).then((result) => {
      setLoading(false)
      setPrescriptions(result)
      GetAllsubjects(result)
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

  useEffect(() => {
    //get all PATIENT prescription in the first time
    if (userDetails.id % 2 != 0) {
      getPrescriptions()
      console.log("pres=>", prescriptions);
    }
  }, []);

  // POST - new prescription request
  useEffect(() => {
    if (!show && request && reqValue) {

      Post_new_Prescription(request).then(response => {
        response && getPrescriptions();
      })
        .catch((error) => {
          error == 403 ?
            setAlert(
              <Alert text={error.response.data.Message}
                type='worng'
                time={2000}
                bottom={110}
              />) :
            setAlert(
              <Alert text={error}
                type='worng'
                time={2000}
                bottom={110}
              />)
              console.log("error in function Post_new_Prescription "+error);
        });
    }
  }, [request]);

  // get all subjects distinct
  const GetAllsubjects = (res) => {
    let arr = [];
    res.map((x) => {
      arr.push(x.subject)
    })
    let distinct = arr.filter((val, i, self) => self.indexOf(val) === i);
    let allSub = distinct.map((x, i) => ({ itemKey: i, label: x, value: x }))
    setAllSubjects(allSub);
  }

  // element popup for new prescription request
  const element = <View>
    <Text style={{
      fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 'bold', marginBottom: '3%', textShadowColor: '#187FA5',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
    }}>new subject</Text>
    <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', width: '100%' }}>
      {popupSubject ?
        <Input
          label='Choose your medicine'
          height={50}
          type='selectBox'
          getValue={(value) => setSubject(value)}
          SelectBox_placeholder='Select medicine...'
          placeholder='Select medicine from list...'
          width={100}
          justifyContent='flex-start'
          alignItems='flex-end'
          editable={false}
          selectBox_items={allSubjects} />
        :
        <Input
          label='Write new subject/medicine'
          height={50}
          value={!popupSubject && ''}
          width={100}
          getValue={(value) => setSubject(value)}
          justifyContent='flex-start'
          alignItems='flex-end'
          placeholder='type new subject/medicine...'
        />
      }
      <Switch
        style={{ alignSelf: 'center', marginLeft: '7%', marginTop: '3%' }}
        trackColor={{ false: "#FFFFFF", true: "#3CA6CD" }}
        thumbColor={popupSubject ? '#FFCF84' : "#3CA6CD"}
        ios_backgroundColor='#FFCF84'
        onValueChange={() => { setPopupSubject(!popupSubject) }}
        value={!reqValue || !subject ? popupSubject : ''}
      />

    </View>
    <View style={{ flex: 3, justifyContent: 'flex-start', paddingBottom: '5%' }}>
      <Input
        label='Something else? ♥'
        placeholder='Free text here..'
        multiline={true}
        numberOfLines={4}
        height={70}
        width={100}
        getValue={(value) => setReqValue(value)}
        justifyContent='center'
        alignItems='center'
        validLable={!reqValue || !subject ? '    fill subject and description' : ''}
      />
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Button
        text='cancel'
        justifyContent='center'
        alignItems='center'
        width={10}
        height={3}
        onPress={() => setShow(false)}
      />
      <Button
        text='ok'
        justifyContent='center'
        alignItems='center'
        width={20}
        height={3}
        onPress={() => {
          if (reqValue && subject && userDetails) {
            setRequest({
              date_time: moment(new Date()).format('MM-DD-YYYY H:mm').toString(),
              subject: subject,
              value: reqValue,
              Patients_id: userDetails.id,
              Doctor_id: 2,       //todo change doctor id to real id
              status: 'waiting'
            });
            setShow(false);
          }
        }}
      >
      </Button>
    </View>
  </View>

  //let icon=<MaterialCommunityIcons name="pill" size={24} color="black"/>;
  const btnPrescDetails = (id) => {
    setIdForPrescription(id)
    setShowDetails(true);
    const onePrescription = prescriptions.find(x => x.id === id)
    setPopupElement(
      <>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: '10%' }}> {onePrescription.subject} </Text>
        <Text style={{ textAlign: 'center', marginBottom: '5%' }}> Request details: </Text>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{onePrescription.value} </Text>
        <Text style={{ textAlign: 'center', marginTop: '10%' }}>request from : {moment(new Date(onePrescription.date_time)).format('DD/MM/YYYY H:mm')} </Text>
        <Text style={{ textAlign: 'center', marginTop: '10%' }}>Status : {onePrescription.status}</Text>
      </>
    )
  }
  // PUT - put method for doctor to change status. status can be - waiting / rejected  / accepted

  const handleRequest = (status) => {
    let editStatus;
    status == 'reject' ?
      editStatus = { status: 'rejected' } :
      editStatus = { status: 'accepted' }
    Put_Prescription(idForPrescription, editStatus).then((response) => {
      response && getPrescriptions();
      showDetails && setShowDetails(false);
    })
      .catch((error) => {
        setAlert(
          <Alert text="sorry, somthing went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={110}
          />)
        //alert(error.response.data.Message)
        console.log("error in function Put_Prescription "+error);
        showDetails && setShowDetails(false);
      });
  }


  const deletePrescription = () => {
    delAlert && setDelAlert(false)

    Delete_Prescriptions(idForPrescription).then((resulte) => {
      console.log('deleteRes=>', resulte);
      showDetails && setShowDetails(false);
      getPrescriptions();
    },
      (error) => {
        console.log("error", error)
        showDetails && setShowDetails(false);
        setAlert(
          <Alert text="sorry, somthing went wrong, please try again later"
            type='worng'
            time={2000}
            bottom={110}
          />);
      })
  }



  //<DeleteAlert answer={(answer)=>console.log('ans2=',answer)}/>
  return (
    <View style={styles.container}>
      <Header
        title='Prescriptions'
        logo_image='perscriptions'
        flex={userDetails.id % 2 == 0 ? 0.4 : 0.8}
        possiton={60}
        image_margin={{ Bottom: -4 }}
        marginLeft={7}
      // justifyContent='flex-start' 
      />
      {userDetails.id % 2 == 0 ?
        <Text style={styles.title}>{userDetails.patientNAME ? userDetails.patientNAME : 'No One'}'s requests:</Text> :
        <Text style={styles.title}>Your last requests:</Text>}
      <ScrollView style={styles.list}>
        <View >
          {prescriptions && prescriptions.map((item) => (
            <View key={item.id} style={styles.oneItem}>
              <TouchableOpacity onPress={() => { btnPrescDetails(item.id) }}>
                <Text style={styles.status}>{<MaterialCommunityIcons name="pill" size={24} color={item.status == 'accepted' ? "#1EAC14" : item.status == 'rejected' ? "#EF5C5C" : "#F7FD52"} />} - Request from {moment(new Date(item.date_time)).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
            </View>
          ))

          }
        </View>
      </ScrollView>

      {loading && <View style={styles.progress}>
        <Progress.Bar
          width={255}
          height={15}
          borderRadius={5}
          borderColor={'#69BEDC'}// "#bbe4f2"
          color='#FFCF84' //-orange //'#69BEDC' = >blue
          useNativeDriver={true}
          borderWidth={2}
          indeterminate={true}
          animationConfig={{ bounciness: 20 }}
        />
      </View>
      }

      <Text style={styles.info}><MaterialCommunityIcons name="pill" size={24} color="#1EAC14" /> Accepted  <MaterialCommunityIcons name="pill" size={24} color="#F7FD52" /> Waiting  <MaterialCommunityIcons name="pill" size={24} color="#EF5C5C" /> Rejected </Text>

      {userDetails.id % 2 != 0 && <Button
        text='New prescription request'
        width={12}
        height={4}
        alignItems='center'
        justifyContent='flex-end'
        onPress={() => setShow(true)}
      />
      }

      <Image
        style={styles.Image}
        source={require('../images/prescriptions.png')}
      />
      {show &&
        <PopUp
          height={45}
          width={90}
          isButton={false}
          button_textSize={16}
          setShow={setShow}
          backgroundColor='#d6f2fc'
          element={element}
          button_justifyContent='flex-start'
        />}

      {showDetails && prescriptions && userDetails.id % 2 != 0 &&
        <PopUp
          height={45}
          width={90}
          //   setShow={setShowDetails}
          backgroundColor='#d6f2fc'
          element={
            <>
              {popupElement}
              <View style={{ flexDirection: 'row', paddingTop: '20%', paddingLeft: '10%' }}>
                <Button text='Delete' onPress={() => setDelAlert(true)} />
                <Button text='Cancle' onPress={() => setShowDetails(false)} />
              </View>
            </>
          }
          isButton={false}
        />}

      {showDetails && prescriptions && userDetails.id % 2 == 0 &&
        <PopUp
          height={45}
          width={90}
          backgroundColor='#d6f2fc'
          element={
            <>
              {popupElement}
              <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row', paddingTop: '20%' }}>
                <Button text='Reject' onPress={() => { handleRequest('reject') }} />
                <Button text='Accept' onPress={() => { handleRequest('accept') }} />
                <Button text='Cancle' onPress={() => setShowDetails(false)} />
              </View>
            </>}
          isButton={false}
        />}



      {alert && alert}
      {delAlert && <DeleteAlert answer={(answer) => { console.log('Delete?=>', answer); answer ? deletePrescription() : setDelAlert(false) }} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center'
  },

  Image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    opacity: 0.95,
    paddingTop: '30%',
    width: '50%',
    height: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flex: 0.5,
    marginTop: '5%'
  },
  list: {
    //flexWrap: 'wrap',
    paddingTop: '5%',
    paddingBottom: '15%',
    flex: 0.5,
    marginTop: '2%'

  },
  oneItem: {
    marginBottom: '5%',
    justifyContent: 'flex-start'
  },
  title: {
    alignSelf: 'center',
    position: 'absolute',
    top: '10%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  popuptitle: {
    fontSize: 30,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#1EA6D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-end',
    flex: 0.2,
    paddingBottom: 15

  },
  popupbuttons: {
    flexDirection: 'row',
    //justifyContent:'flex-end' 
  },
  progress: {
    width: '97%',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  status: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black'

  },
  info: {
    textAlign: 'center',
    fontSize: 20,
    position: 'relative',
    top: '4%'
    // paddingTop:'10%'
  }



});