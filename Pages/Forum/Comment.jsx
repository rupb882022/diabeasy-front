import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import moment from 'moment';// #Nir moment format show alert eror
import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';
import Input from '../../CTools/Input';
import Button from '../../CTools/Button';
import PopUp from '../../CTools/PopUp';
import ImageUri from '../../Routes/ImageUri';

export default function Comment(props) {
  let user_id=1;

  //igone props.item bug in flatList use let comment from comment json
  const { item, index, comments,getAllComments,updateComment } = props;
  let comment = comments[index];
  let propile_image = '';

  const [showEdit, setShowEdit] = useState(false)//pop up editcomment user
  const [changeComment, setChangeComment] = useState('');//for action on comment like delete or update
  const [editText,setEditText]=useState(comment.value)

// #Nir  how to fix the image load
  if (comment.image) {
     propile_image =<Image source={{uri:ImageUri+comment.image}} style={styles.image(30, 30)}/> 
  }
  else { 
    propile_image=<Image source={require('../../images/profile_pictur.jpeg')} style={styles.image(30, 30)}/>
  }

  return (<>
  <View style={styles.comments} id={comment.writer_id}>
    <View style={styles.row}>
      {propile_image}
      <Text style={styles.name}>{comment.name}</Text>
      {user_id == comment.writer_id &&
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
              getValue={(value)=>setEditText(value)}
            />
            <Button 
            alignItems='flex-end'
            justifyContent='center'
            width={5}
            height={4}
            radius={5}
            color='white'
            onPress={()=>{setChangeComment(''); updateComment();}}
            element={<MaterialCommunityIcons name="circle-edit-outline" size={20} color="#2DAB5B" />}
            />
          </>
          : <Text style={styles.text(14)}>{editText?editText:comment.value}</Text>}
    </View>
    <View  style={styles.row}>
    <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
      <Text style={styles.date}>{moment(comment.date).format('MM-DD-YYYY')}</Text>
    </View>
    
  </View>
      {showEdit &&
        <PopUp
          animationType='fade'
          isButton={false}
          height={15}
          width={40}
          element={<View style={{ flex: 1, width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <UpdateComment
              setShowEdit={() => { setChangeComment('update'); setShowEdit(false) }}
            />
            <DeleteComment
            id={comment.comment_id}
            getallcomment={getAllComments}
              setShowEdit={() => { setChangeComment('delete'); setShowEdit(false) }} />
          </View>}
        />
      }</>
  );
}


const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginTop:'2%'
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
    marginBottom:'2%',
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
    shadowOpacity:25,
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
});
