import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 ,MaterialCommunityIcons } from '@expo/vector-icons';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import Button from '../../CTools/Button';
import {Post_Comment} from '../../Functions/Function'
import Alert from '../../CTools/Alert';
import Moment from 'moment';


//todo fix alert and date
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
        date_time:Moment( new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
      Post_Comment(comment).then((response) => {
        response&& getAllComments();
      })
      .catch((error) => {
        setAlert(
          <Alert text="sorry something went wrong, try again later"
          type='worng'
          time={2000}
          bottom={110}
          />)
          console.log("error in function Post_Comment"+error);
      });
    }
  }, [comment]);


  return (<>
    <TouchableOpacity style={styles.addComment} onPress={() => { setShow(true); }}>
      <MaterialCommunityIcons  style={styles.Icon} name="comment-plus-outline" size={20} />
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
              multiline={true}
              numberOfLines={6}
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
    paddingTop: '2.5%'
  }, 

})