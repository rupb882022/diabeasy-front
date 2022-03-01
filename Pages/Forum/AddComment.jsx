import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import moment from 'moment';
import Button from '../../CTools/Button';
import apiUrl from '../../Routes/Url';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddComment(props) {
  
  const { comment_id, subject, name,getAllComments,userDetails } = props
  const [show, setShow] = useState(false);//pop up state
  const [comment_value, setComment_value] = useState();//comment text
  const [comment, setComment] = useState({});


  

  const add_comment = () => {
    if (comment_value&& userDetails) {
      let doctor_id = '';
      let patient_id = '';
      //set the right user id
      userDetails.id % 2 == 0 ? doctor_id = userDetails.id : patient_id = userDetails.id;

      setComment({
        date_time: moment(new Date()).format('MM-DD-YYYY').toString(),
        subject: subject,
        value: comment_value,
        Patients_id: userDetails.id,
        Id_Continue_comment: comment_id,
      })
      setShow(false);
    }
  }
  // #Nir check about DTO
  useEffect(() => {
    if (!show && comment && comment_value) {
      const configurationObject = {
        url: `${apiUrl}forum?type=addComment`,
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
        alert("An error has occurred"+error);
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
              label='content'
              height={110}
              justifyContent='flex-strat'
              spellCheck={true}
            />
            <View style={{ flex: 0.9, width: '100%', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <Button
                onPress={() => add_comment()}
                text='ok'
                height={3}
                width={27}
                alignItems='flex-end'
                justifyContent='flex-end'
              />
              <Button
                onPress={() => setShow(false)}
                text='cancel'
                height={3}
                width={14}
                alignItems='flex-start'
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