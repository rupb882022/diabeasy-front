import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';


export default function Comment(props) {

  //igone props.item bug in flatList use let comment from comment json
  const { item, index, comments } = props;
  let comment = comments[index];
  let propile_image = '';

  if (comment.image) {
    // propile_image = require(`'${comment.image}'`)
  }
  else { 
  
    propile_image=require('../../images/profile_pictur.jpeg'); 
  }

  return (<View style={styles.comments} id={comment.writer_id}>
    <View style={styles.row}>
      <Image source={propile_image}
        style={styles.image(30, 30)}
      />
      <Text style={styles.name}>{comment.name}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text(14)}>{comment.value}</Text>
    </View>
    <View  style={styles.row}>
    <MaterialCommunityIcons style={styles.Icon} name="calendar-clock" size={20} />
      <Text style={styles.date}>{moment(comment.date).format('MM-DD-YYYY')}</Text>
    </View>
  </View>
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
    color: 'gray',
    textAlign: 'left',
    paddingTop: '2%',
  }
});
