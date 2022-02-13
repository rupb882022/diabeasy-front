import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Comment from './Comment';
import PopUp from '../../CTools/PopUp';
import Input from '../../CTools/Input';
import { MaterialCommunityIcons, FontAwesome5, AntDesign , Entypo } from '@expo/vector-icons';

export default function MainComment(props) {

  let user_id = 1//temp

  const { item, data, index } = props; //index= index of item in the current subject
  const [isopen, setIsopen] = useState(false);
  const [show, setShow] = useState(false);//pop up state

  //find the index of subject(main comment)
  let data_Index = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].data[index] == item) {
      data_Index = data[i].id;
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



  const open_comments = () => {
    if (isopen) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  }

  return (<>
    <View style={styles.container} id={writer_id}>
      <View style={styles.row}>
        <Image source={require('../../images/profile_pictur.jpeg')}
          style={styles.image(35, 35)}
        />
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={open_comments} style={styles.numberComments}>
          <Text style={styles.numberCommentsText}>{comments.length}</Text>
        </TouchableOpacity>
        {user_id == writer_id &&
          <TouchableOpacity style={styles.delete}>
            <AntDesign style={styles.Icondelete} name="delete" size={20} />
            {/* <Entypo style={styles.Icondelete} name6="dots-three-vertical" size={20} /> */}
          </TouchableOpacity>

        }
      </View>
      <View style={styles.row}>
        <Text style={styles.text(16)}>{item}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
        <Text style={styles.date}> {date}</Text>
        <TouchableOpacity style={styles.addComment} onPress={() => setShow(true)}>
          <FontAwesome5 style={styles.Icon} name="comment-dots" size={20} />
          <Text style={styles.addCommentText}>add comment</Text>
        </TouchableOpacity>
      </View>
    </View>
    {isopen && <FlatList
      data={comments}
      renderItem={({ item, index }) => <Comment value={item} index={index} comments={comments} />}
      keyExtractor={(item, index) => item + index}
    />}
    {show &&
      <PopUp
        title={'comment to ' + name}
        backgroundColor='#d6f2fc'
        Button={false}
        height={30}
        element={
          <View style={{ flex: 4, width: '100%', justifyContent: 'flex-start' }}>
            <Input
              label='content'
              height={50}
            />
          </View>}
        setShow={setShow}
      />}
  </>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#69BEDC",
    padding: '3%',
    marginVertical: '2%',
    shadowOffset: {
      width:-1,
      height: 1
    },
    shadowOpacity:25,
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
    borderWidth: 1,
    height: '50%',
    width: '6%',
    backgroundColor: 'white',
    position: 'absolute',
    right: '2%',
    top: '10%'
  },
  numberCommentsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  date: {
    color: 'gray',
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
  addComment: {
    textAlign: 'left',
    flexDirection: 'row',
    left: '40%',

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
  name: {
    flexDirection: 'column',
    color: '#666666',
    fontSize: 16,
    marginLeft: '3%',
    marginTop: '3%',
    textDecorationLine: 'underline',
  },
  Icon: {
    color: 'gray',
    textAlign: 'left',
    paddingTop: '2%',
  },
  delete: {
    textAlign: 'left',
    flexDirection: 'row',
    left: '50%',
    top: '6%'
  },
  deleteText: {
    color: '#E92F2F',
    fontSize: 12,
    textAlign: 'left',
    paddingTop: '1%',
    marginLeft: '5%'
  },
  Icondelete: {
    color: '#E92F2F',
  }
});