import { StyleSheet, Text, View ,TouchableOpacity,} from 'react-native'
import React ,{useState,useContext} from 'react'
import DeleteAlert from '../../CTools/DeleteAlert'
import {AntDesign} from '@expo/vector-icons'
import { Delete_line_tableData } from '../../Functions/Function'
import { UserContext } from '../../CTools/UserDetailsHook'
import Alert from '../../CTools/Alert';
export default function DeleteDataReportTable(props) {
  const { setShowEdit, time ,getData,setAlert } = props
  const { userDetails } = useContext(UserContext);

  const [delAlert,setDelAlert]=useState(false)
//console.log("t=",time);
  const deleteLine = () => {
    setDelAlert(false)
    setShowEdit();
    Delete_line_tableData(time,userDetails.id).then((resulte) => {
      resulte&&getData();
    },
      (error) => {
        setAlert(
          <Alert text={`Sorry but we were unable to delete the requested line. Please try again later`}
            type='worng'
            time={5000}
            bottom={100}
          />)
        console.log("error in function Delete_line_tableData", error)
      })
  }

  return (
 <>
   <TouchableOpacity style={styles.Delete} onPress={()=>{setDelAlert(true)}}>
      <Text>
        <AntDesign name="delete" size={20} color="black" />
        Delete
      </Text>
    </TouchableOpacity>
    {delAlert && <DeleteAlert answer={(answer) => { answer ? deleteLine() : setDelAlert(false) }} />}
 </>
  )
}

const styles = StyleSheet.create({
  Delete: {
    backgroundColor: '#ffd087',
    width: '130%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:'15%',
    marginTop:'2%',
    padding:'2%'
  }


})