import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import moment from 'moment';
import Button from '../../CTools/Button';
import apiUrl from '../../Routes/Url';

export default function AddComment(props) {
  let user_id = 1//temp
  const { comment_id, subject, name } = props
  const [show, setShow] = useState(false);//pop up state
  const [comment_value, setComment_value] = useState();//comment text
  const [comment, setComment] = useState({});

  const add_comment = () => {
    if (comment_value) {
      let doctor_id = '';
      let patient_id = '';
      //set the right user id
      user_id % 2 == 0 ? doctor_id = user_id : patient_id = user_id;

      setComment({
        date_time: moment(new Date()).format('MM-DD-YYYY').toString(),
        subject: subject,
        value: comment_value,
        Patients_id: user_id,
        Id_Continue_comment: comment_id,
      })
      setShow(false);
    }
  }
// #Nir  cheack status 415 and check about DTO
  useEffect(() => {
    if (!show && comment && comment_value) {
      console.log("comment",JSON.stringify(comment))
      console.log(apiUrl+ `forum?type=add_comment`)
      fetch(apiUrl + `forum?type=add_comment`, {
        method: 'POST',
        mode:'no-cors',
        headers:{
          'Content-Type':'appliction/json',
          'Accept':'appliction/json',
          'Accept-Encoding':'gzip, deflate, br',
          'Connection':'keep-alive'
        },
        body:JSON.stringify(comment)
      }).then(res => {
        if (res && res.status == 201) {
          return res.json();
        } else {
          console.log("status code:", res.status)
        }
      }).then((resulte) => {
        console.log(resulte);
      },
        (error) => {
          console.log("error", error)
        })
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
                onPress={() => add_comment(comment_id)}
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