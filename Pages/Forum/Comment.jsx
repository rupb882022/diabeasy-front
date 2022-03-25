import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';
import Input from '../../CTools/Input';
import Button from '../../CTools/Button';
import PopUp from '../../CTools/PopUp';
import { ImageUri } from '../../Routes/Url';

export default function Comment(props) {
  //igone props.item bug in flatList use let comment from comment json
  const { item, index, comments, getAllComments, updateComment, userDetails } = props;
  let comment = comments[index];
  let propile_image = '';

  const [showEdit, setShowEdit] = useState(false)//pop up editcomment user
  const [changeComment, setChangeComment] = useState('');//for action on comment like delete or update
  const [editText, setEditText] = useState(comment.value)


  if (comment.image) {
    propile_image = <Image source={{ uri: ImageUri + comment.image }} style={styles.image(30, 30)} />
  }
  else {
    propile_image = <Image source={require('../../images/profile_pictur.jpeg')} style={styles.image(30, 30)} />
  }

  return (<>
    <View style={styles.comments} id={comment.writer_id}>
      <View style={styles.row}>
        {propile_image}
        <Text style={styles.name}>{comment.name}</Text>
        {userDetails && userDetails.id == comment.writer_id &&
          <TouchableOpacity style={styles.edit} onPress={() => setShowEdit(true)}>
            <Entypo name="dots-three-vertical" size={20} style={styles.Icon} />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.row}>
        {changeComment == 'update' ?
          <>
            <Input
              fontSize={14}
              height={35}
              width={170}
              alignItems='flex-start'
              setValue={comment.value}
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
              element={<MaterialCommunityIcons name="circle-edit-outline" size={20} color="#2DAB5B" />}
            />
          </>
          : <Text style={styles.text(14)}>{editText ? editText : comment.value}</Text>}
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
        <Text style={styles.date}>{moment(new Date(comment.date.toString())).format("DD/MM/YYYY")}</Text>
      </View>

    </View>
    {showEdit &&
      <PopUp
        animationType='fade'
        isButton={false}
        backgroundColor='#FCEBD6'
        height={18}
        width={40}
        element={<>
          <View style={{ flex: 3, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <UpdateComment
              setShowEdit={() => { setChangeComment('update'); setShowEdit(false) }}
            />
            <DeleteComment
              id={comment.comment_id}
              getallcomment={getAllComments}
              setShowEdit={() => { setChangeComment('delete'); setShowEdit(false) }} />
            <TouchableOpacity style={styles.cancel} onPress={()=>{setShowEdit(false); setChangeComment('');} }><Text style={{ textAlign: 'center' }}>cancel</Text></TouchableOpacity>

          </View>
        </>
        }
      />
    }</>
  );
}


const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginTop: '2%'
  },
  text: fontSize => {
    return {
      fontSize: fontSize,
      flexWrap: 'wrap',
      flexShrink: 1,
      alignSelf: 'center',
      marginTop: '2%',
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
  date: {
    color: 'gray',
    textAlign: 'left',
    paddingTop: '3%',
    marginBottom: '2%',
    fontSize: 12
  },
  comments: {
    backgroundColor: '#D2E4F7',
    padding: '1%',
    marginVertical: '2%',
    paddingLeft: '3%',
    shadowOffset: {
      width: -1,
      height: 1
    },
    shadowOpacity: 25,
  },
  name: {
    flexDirection: 'column',
    color: '#666666',
    fontSize: 14,
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
    left: '62%',
    bottom: '25%'
  },
  cancel: {
    backgroundColor: '#F9AC27',
    width: '130%',
    flex: 1,
    justifyContent: 'center',
    marginTop: '2%',
  },
});
