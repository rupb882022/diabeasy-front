import { View, StyleSheet, Text,TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, { useState, useEffect ,useContext} from 'react';
import Header from '../CTools/Header';
import Input from '../CTools/Input';
import Button from '../CTools/Button';
import Loading from '../CTools/Loading';
import { Get_all_InsulinType,GETpersonalInfoToEdit,Put_EditPersonalInfo} from '../Functions/Function';
import Alert from '../CTools/Alert';
import { UserContext } from '../CTools/UserDetailsHook';
import moment from 'moment';

export default function EditPersonalInfo(props) {

  const {navigation } = props
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  //const [validtion, setValidtion] = useState('')
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState()
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [insulinTypeShort, setInsulinTypeShort] = useState();
  const [insulinTypeLong, setInsulinTypeLong] = useState(null);
  const [mailDoctor, setMailDoctor] = useState(null);
  const [selectInsulinLong, setSelectInsulinLong] = useState(null);
  const [selectInsuliShort, setSelectInsulinShort] = useState(null);
  const { userDetails } = useContext(UserContext);

useEffect(()=>{
//get Details and fill fileds
GETpersonalInfoToEdit(userDetails.id).then((resulte)=>{
  let res=resulte[0];
console.log('edit res=>', resulte);
setFirstName(res.firstname);setLastName(res.lastname);setHeight(res.height);setWeight(res.weight);
setGender(res.gender);setBirthDate(res.birthdate);setInsulinTypeShort(res.InsulinType_id);
setInsulinTypeLong(res.InsulinType_long_id);setMailDoctor(res.docEmail[0])
},
(error)=>{
  console.log("error", error)
  setAlert(
    <Alert text="sorry, something went wrong, please try again later"
      type='worng'
      time={2000}
      bottom={110}
    />);})
},[])



  const setDate=(value)=>{
    if(value){
    let date=value.split("/");
     date=`${date[2]}-${date[1]}-${date[0]}` 
     setBirthDate(date)
    }
}

const getInsulinType = () => {
  Get_all_InsulinType().then((resulte) => {
      let longType = [];
      let shortType = [];
      resulte.map((x, i) => {
          let obj = { itemKey: i, label: x.name, value: x.id }
          x.type == 'short' ? shortType.push(obj) : longType.push(obj)
      })
      setSelectInsulinLong(longType);
      setSelectInsulinShort(shortType);
  },
      (error) => {
          console.log("error in function Get_all_InsulinType ", error)
      })
}

if (!selectInsuliShort && !selectInsulinLong) {
  getInsulinType();
}

const PutEditPersonalInfo=()=>{
let data= {
  id:userDetails.id,
  firstname:FirstName,
  lastname:LastName,
  weight:weight,
  height:height,
  gender:gender,
  birthdate:birthDate,
  email:mailDoctor,
  InsulinType_id:insulinTypeShort,
  InsulinType_long_id:insulinTypeLong,
}
console.log("data for postman=>",data);
Put_EditPersonalInfo(userDetails.id,data).then((response) => {
  response&&navigation.goBack()&&console.log("ok=>",response);
})
.catch((error) => {
  setAlert(
    <Alert text="sorry something went wrong, try again later"
    type='worng'
    time={2000}
    bottom={40}
    />)
    console.log("error in function Put_EditPersonalInfo "+error);
});


}



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
            {/* {loading && <Loading opacity={'#d6f2fc'} />} */}
            <Header
                title='Personal Info'
                possiton={-15}
                marginLeft={4}
                line={false}
            />
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'space-around',marginTop:'5%' }}>
                <Input
                    label='First Name'
                    validtion='letters'
                    setValue={FirstName?`${FirstName}`:''}
                    width={55}
                    getValue={(value) => setFirstName(value)}
                    alignItems='center'
                    placeholder={FirstName?`${FirstName}`:''}
                />
                <Input
                    label='Last Name'
                    validtion='letters'
                    //setValue={LastName}
                    width={75}
                    getValue={(value) => setLastName(value)}
                    alignItems='flex-start'
                    placeholder={LastName?`${LastName}`:''}

                />
            </View>

            <Input
                label='Gender'
                editable={false}
                type='selectBox'
                required={true}
                setValue={gender}
                placeholder={gender?`${gender}`:''}
                SelectBox_placeholder='Gender'
                getValue={(value) => setGender(value)}
                selectBox_items={[
                    { itemKey: 0, label: 'Male', value: 'm' },
                    { itemKey: 1, label: 'Female', value: 'f' },
                    { itemKey: 2, label: 'Other', value: 'o' },
                ]} />

            <Input
                popup_title='Your Birth Date'
                label='Date Of Birth '
                type='date'
                mode='date'
                min={new Date(1920, 1, 1)}
                editable={false}
                display='spinner'
                date_format_hour={false}
                required={true}
                setValue={birthDate}
                getValue={(value) => {setDate(value)}}
                placeholder={birthDate?`${moment(birthDate).format("DD/MM/YYYY")}`:''}                       ///todo change format
            />
              <View style={{ flexDirection: 'row', flex: 1, marginLeft: '6%' }}>
                    <Input
                        label='Weight'
                        width={70}
                        alignItems='center'
                        validtion='number'
                        keyboardType='number-pad'
                       // placeholder='  kg'
                        required={true}
                        getValue={(value) => setWeight(value)}
                        placeholder={weight?`${weight}`:'kg'}

                    />

                    <Input
                        label='Height'
                        validtion='number'
                        keyboardType='number-pad'
                       // placeholder='cm'
                        width={70}
                        alignItems='flex-start'
                        required={true}
                        getValue={(value) => setHeight(value)}
                        placeholder={height?`${height}`:'cm'}

                    />
                </View>
                {/* <Input
                    label='Emergency Contact Phone Number'
                    validtion='number'
                    keyboardType='number-pad'
                   // placeholder='+972'
                    getValue={(value) => setPhoneNumber(value)}
                /> */}

                <Input
                    label='Add Your Doctor By Email'
                    keyboardType='email-address'
                    getValue={(value) => setMailDoctor(value)}
                    placeholder={mailDoctor?`${mailDoctor}`:''}

                />
                <Input
                    label='Short insulin type'
                    required={true}
                    type='selectBox'
                    editable={false}
                    getValue={(value) => setInsulinTypeShort(value)}
                    SelectBox_placeholder='Select short insulin type'
                    selectBox_items={selectInsuliShort}
                    placeholder={insulinTypeShort?`${insulinTypeShort}`:''}

                />
                <Input
                    label='Long insulin type'
                    required={true}
                    type='selectBox'
                    selectSide='right'
                    editable={false}
                    getValue={(value) => setInsulinTypeLong(value)}
                    SelectBox_placeholder='Select long insulin type'
                    selectBox_items={selectInsulinLong}
                    placeholder={insulinTypeLong?`${insulinTypeLong}`:''}           //todo= change format

                />

            <View style={styles.Buttons}>
                <View style={styles.back}>
                    <Button
                        text="back"
                        width={18}
                        height={4}
                        justifyContent='center'
                        onPress={() => { setLoading(true); navigation.goBack() }}
                    />
                </View>                                          
                        <View style={styles.Update}>
                            <Button
                                alignItems='flex-end'
                                text="Update"
                                width={12}
                                height={4}
                                justifyContent='flex-start'
                                onPress={PutEditPersonalInfo}
                            /></View>
                
            </View>
        </View>
        </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    top: '2%',
    marginBottom:'5%'
},
Update: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '13%',
    marginTop: '6%'
},
txt: {
    left: '150%',
    paddingBottom: '1%'
},
uploadbutton: {
    flex: 1,
    paddingLeft: 50
},
logo: {
    width: 40,
    height: 40
},
Buttons: {
    flex: 1,
    flexDirection: 'row',
    bottom: '2%',
    marginLeft: '2%'
},
back: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '4%',
},
Register: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '13%',
    marginTop: '5%'
}



})