import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Comment from './Comment';
import PopUp from '../../CTools/PopUp';
import { MaterialCommunityIcons, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import moment from 'moment';
import AddComment from './AddComment';

export default function MainComment(props) {

  let user_id = 1//temp

  const { item, data, index } = props; //index= index of item in the current subject
  const [isopen, setIsopen] = useState(false);//respon comments
  const [showEdit, setShowEdit] = useState(false)//pop up editcomment user

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
  let subject=data[data_Index].subject


  return (<>
    <View style={styles.container} id={writer_id}>
      <View style={styles.row}>
        <Image source={require('../../images/profile_pictur.jpeg')}
          style={styles.image(35, 35)}
        />
        <Text style={styles.name}>{name}</Text>
        {user_id == writer_id &&
          <TouchableOpacity style={styles.edit} onPress={() => setShowEdit(!showEdit)}>
            <Entypo name="dots-three-vertical" size={20} style={styles.Icon} />
          </TouchableOpacity>

        }
      </View>
      <View style={styles.row}>
        <Text style={styles.text(16)}>{item}</Text>
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
        <Text style={styles.date}> {moment(date).format('MM-DD-YYYY')}</Text>
        <AddComment
          comment_id={comment_id}
          subject={subject}
          name={name}
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
      renderItem={({ item, index }) => <Comment value={item} index={index} comments={comments} />}
      keyExtractor={(item, index) => item + index}
    />}

    {showEdit &&
      <PopUp
        animationType='fade'
        isButton={false}
        height={15}
        width={40}
        element={<View style={{ flex: 1, width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShowEdit(!showEdit)} style={{ marginRight: '10%' }}><Text>
            <Feather name="edit-3" size={20} color="black" />
            Edit
          </Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEdit(!showEdit)}>
            <Text >
              <AntDesign name="delete" size={20} color="black" />
              delete
            </Text></TouchableOpacity>
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
    left: '59%',
    bottom: '25%'
  },
});