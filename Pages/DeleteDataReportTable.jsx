import { StyleSheet, Text, View ,TouchableOpacity,} from 'react-native'
import React ,{useState} from 'react'
import DeleteAlert from '../CTools/DeleteAlert'
import {AntDesign} from '@expo/vector-icons'
import { Delete_line_tableData } from '../Functions/Function'

export default function DeleteDataReportTable(props) {
  const { setShowEdit, time ,getData } = props

  const [delAlert,setDelAlert]=useState(false)
//console.log("t=",time);
  const deleteLine = () => {
    setDelAlert(false)
    setShowEdit();
    Delete_line_tableData(time).then((resulte) => {
      resulte&&getData();
    },
      (error) => {
        console.log("error in function Delete_line_tableData", error)
      })
  }

  return (
 <>
   <TouchableOpacity style={styles.Delete} onPress={()=>{setDelAlert(true)}}>
      <Text>
        <AntDesign name="delete" size={20} color="black" />
        delete
      </Text>
    </TouchableOpacity>
    {delAlert && <DeleteAlert answer={(answer) => { answer ? deleteLine() : setDelAlert(false) }} />}
 </>
  )
}

const styles = StyleSheet.create({
  Delete: {
    backgroundColor: '#FFC052',
    width: '130%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:'15%',
    marginTop:'2%',
    padding:'2%'
  }


})