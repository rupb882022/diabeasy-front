import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Comment from './Comment';
import PopUp from '../../CTools/PopUp';
import { MaterialCommunityIcons, AntDesign, Entypo,Feather } from '@expo/vector-icons';
import moment from 'moment';
import AddComment from './AddComment';
import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';
import Input from '../../CTools/Input';
import Button from '../../CTools/Button';
import apiUrl from '../../Routes/Url';
import {ImageUri} from '../../Routes/Url';
import axios from "axios";
import Alert from '../../CTools/Alert';

export default function MainComment(props) {


  const { item, data, index, getAllComments,userDetails,setAlert } = props; //index= index of item in the current subject
  const [isopen, setIsopen] = useState(false);//respon comments
  const [showEdit, setShowEdit] = useState(false)//pop up editcomment user
  const [changeComment, setChangeComment] = useState('');//for action on comment like delete or update
  const [editText, setEditText] = useState(item)



  //find the index of subject(main comment)
  let data_Index = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].data[index] == item) {
      data_Index = data[i].index;
    }
  }

  //array of Continued comments
  let comments = data[data_Index].exstraData[index].comments;
  //writer name
  let name = data[data_Index].exstraData[index].name;
  //comment date
  let date = data[data_Index].exstraData[index].date;
  //id of writer
  let writer_id = data[data_Index].exstraData[index].writer_id;
  // comment id
  let comment_id = data[data_Index].exstraData[index].comment_id;
  //current subject
  let subject = data[data_Index].subject
  //image
  let image = data[data_Index].exstraData[index].image ?
  <Image source={{ uri:ImageUri+data[data_Index].exstraData[index].image}}  style={styles.image(35, 35)} /> : 
   <Image source={require('../../images/profile_pictur.jpeg')} style={styles.image(35, 35)} />


  const updateComment = () => {
//user can not edit comment if he have responses
    if (comments.length != 0) {
      return;
    }
let editComment={ subject: subject, value: editText }

    const configurationObject = {
      url: `${apiUrl}Forum/${comment_id}`,
      method: "PUT",
      data:editComment
    };
    axios(configurationObject)
    .then((response) => {
      console.log(response.status);
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
        bottom={40}
        />)
      console.log(error);
    });
  }

  return (<>
    <View style={styles.container} id={writer_id}>
      <View style={styles.row}>
        {image}
        <Text style={styles.name}>{name}</Text>
        { userDetails&&userDetails.id == writer_id ?
          <TouchableOpacity style={styles.edit} onPress={() => setShowEdit(true)}>
            <Entypo name="dots-three-vertical" size={20} style={styles.Icon} />
          </TouchableOpacity>
        :<></>}
      </View>
      <View style={styles.row}>
        {changeComment == 'update' && comments.length == 0 ?
          <>
            <Input
              fontSize={14}
              height={35}
              width={170}
              alignItems='flex-start'
              setValue={item}
              getValue={(value) => setEditText(value)}
            />
            <Button
              alignItems='flex-end'
              justifyContent='center'
              width={5}
              height={4}
              radius={5}
              color='white'
              onPress={() => { setChangeComment(''); updateComment(); }}
              element={<Feather name="check-circle" size={20} color="#2DAB5B" />}
            />
          </>
          : <Text style={styles.text(16)}>{editText ? editText : item}</Text>}
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
        <Text style={styles.date}> {date&&moment(new Date(date.toString())).format("DD/MM/YYYY")}</Text>
        <AddComment
          comment_id={comment_id}
          subject={subject}
          name={name}
          setAlert={setAlert}
          userDetails={userDetails}
          getAllComments={getAllComments}
        />
        <TouchableOpacity onPress={() => setIsopen(!isopen)} style={styles.numberComments}>
          {isopen ? <AntDesign name="up" size={20} style={styles.Icon} />
            : <AntDesign name="down" size={20} style={styles.Icon} />}
          <Text style={styles.numberCommentsText}>{comments.length} response</Text>
        </TouchableOpacity>
      </View>
    </View>
    {isopen && <FlatList
      data={comments}
      renderItem={({ item, index }) =>
        <Comment updateComment={updateComment}
          getAllComments={getAllComments}
          value={item}
          userDetails={userDetails}
          index={index} comments={comments}
        />}
      keyExtractor={(item, index) => item + index}
    />}

    {showEdit &&
      <PopUp
        animationType='fade'
        backgroundColor='#FCEBD6'
        isButton={false}
        height={19}
        width={40}
        element={<View style={{ flex: 3, width: '100%', justifyContent:'space-between', alignItems: 'center' }}>
          <UpdateComment
            setShowEdit={() => { setChangeComment('update'); setShowEdit(false); 
            comments.length > 0&&setAlert(
              <Alert text="can not edit comment with respones"
              type='info'
              time={2500}
              bottom={110}
              />); 
            }}
          />
          <DeleteComment
            id={comment_id}
            respones={comments.length > 0}
            getallcomment={getAllComments}
            setShowEdit={() => { setChangeComment('delete'); setShowEdit(false) }} />
            <TouchableOpacity style={styles.cancel} onPress={()=>{setShowEdit(false); setChangeComment('');} }><Text style={{textAlign:'center'}}>cancel</Text></TouchableOpacity>
        </View>}
      />
    }
 </>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#69BEDC",
    padding: '3%',
    marginVertical: '2%',
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowOpacity: 25,
  },
  row: {
    flexDirection: 'row',
  },
  text: fontSize => {
    return {
      fontSize: fontSize,
      flexWrap: 'wrap',
      flexShrink: 1,
      alignSelf: 'center',
      marginTop: '4%',
      marginBottom: '2%'
    }
  },
  image: (width, height) => {
    return {
      width: width,
      height: height,
      borderRadius: 1000,
      alignSelf: 'flex-start',
      borderColor: "white",
      borderWidth: 2
    }
  },
  numberComments: {

    position: 'absolute',
    left: '74%',
    top: '29%',
    flexDirection: 'row'


  },
  numberCommentsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666666',
    paddingTop: '3%',
  },
  date: {
    color: '#666666',
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 12
  },
  comments: {
    backgroundColor: '#D2E4F7',
    padding: '1%',
    marginVertical: '2%',
    paddingLeft: '3%'
  },
  name: {
    flexDirection: 'column',
    color: '#666666',
    fontSize: 16,
    marginLeft: '3%',
    marginTop: '3%',
    textDecorationLine: 'underline',
  },
  Icon: {
    color: '#666666',
    textAlign: 'left',
    paddingTop: '2%',
  },
  edit: {
    flexDirection: 'row',
    position:'absolute',
    left: '95%',
    bottom: '25%',
    
  },
  cancel:{
    backgroundColor:'#F9AC27',
    width:'130%',
    flex: 1,
    justifyContent:'center',
    marginTop:'2%',
  },
});