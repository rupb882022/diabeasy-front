import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import Button from '../../CTools/Button';
import apiUrl from '../../Routes/Url';
import axios from "axios";
import Alert from '../../CTools/Alert';

//todofix alert and date
export default function AddComment(props) {
  
  const { comment_id, subject, name,getAllComments,userDetails,setAlert } = props
  const [show, setShow] = useState(false);//pop up state
  const [comment_value, setComment_value] = useState();//comment text
  const [comment, setComment] = useState({});




  const add_comment = () => {
    if (comment_value&& userDetails) {
      let doctor_id;
      let patient_id;

      userDetails.id % 2 == 0 ? doctor_id = userDetails.id : patient_id = userDetails.id;
      setComment({
        date_time: new Date(),
        subject: subject,
        value: comment_value,
        Patients_id: patient_id,
        Doctor_id:doctor_id,
        Id_Continue_comment: comment_id,
      })
      setShow(false);
    }
  }

  useEffect(() => {
    if (!show && comment && comment_value) {
      console.log("comment",comment)
      const configurationObject = {
        url: `${apiUrl}forum/addComment`,
        method: "POST",
        data:comment
      };
      axios(configurationObject)
      .then((response) => {
        if (response.status === 200||response.status===201) {
          getAllComments()
        } else {
          throw new Error("An error has occurred");
        }
      })
      .catch((error) => {
        setAlert(
          <Alert text="sorry somting is got worng try agine later"
          type='worng'
          time={2000}
          bottom={110}
          />)
          console.log(error);
      });
    }
  }, [comment]);


  return (<>
    <TouchableOpacity style={styles.addComment} onPress={() => { setShow(true); }}>
      <FontAwesome5 style={styles.Icon} name="comment-dots" size={20} />
      <Text style={styles.addCommentText}>add comment</Text>
    </TouchableOpacity>
    {show &&
      <PopUp
        title={'comment to ' + name}
        backgroundColor='#d6f2fc'
        isButton={false}
        height={30}
        element={
          <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start' }}>
            <Input
              getValue={(value) => setComment_value(value)}
              required={true}
              placeholder='content..'
              height={110}
              justifyContent='flex-strat'
              spellCheck={true}
            />
            <View style={{ flex: 0.9, width: '100%', justifyContent: 'flex-start', flexDirection: 'row-reverse' }}>
              <Button
                onPress={() => add_comment()}
                text='ok'
                height={3}
                width={27}
                alignItems='flex-start'
                justifyContent='flex-end'
              />
              <Button
                onPress={() => setShow(false)}
                text='cancel'
                height={3}
                width={14}
                alignItems='flex-end'
                justifyContent='flex-end'
              />
            </View>
          </View>}
      />}
</>

  )
}
const styles = StyleSheet.create({
  addComment: {
    textAlign: 'center',
    flexDirection: 'row',
    left: '8%',

    color: '#666666',
    fontSize: 12
  },
  addCommentText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: '3%',
    marginLeft: '5%'
  },
  Icon: {
    color: '#666666',
    textAlign: 'left',
    paddingTop: '2%',
  },

})