import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { ImageUri } from '../Routes/Url'
import {readAlert} from '../Functions/Function'


let i = -1;

const AlertList = (props) => {
  const { list, navigation, setShow } = props
  
  useEffect(() => {
    i = -1;
  })



  const alertContent = (name, content) => {
    switch (content) {
      case "forum-comment":
        return `you got new respone on your comment by ${name}`

      case "forum-subject":
        return `${name} add new comment in the same subject that you comment about`
      default:
        return '';
        break;
    }
  }
  const navigationTo = (content, id) => {
console.log("!");
    readAlert(id).then((response) => {
      console.log("2");
      if (response) {
         setShow();
        switch (content) {
          case "forum-comment":
            navigation.navigate('Forum')
            break;
          case "forum-subject":
            navigation.navigate('Forum')
            break;
          default:
            break;
        }
      }
    })
      .catch((error) => {
        console.log("error in function readAlert " + error)
      })
  }


  const Item = ({ id, name, profileimage, active, content, date_time, daysLeft, daysLeftName }) => {
    i++;
    return (
      <TouchableOpacity onPress={() => { navigationTo(content, id);  }} style={styles.itemContainer(active)}>
        <View id={id} style={styles.item(Dimensions.get("window").width, i, active)}>
          <Image style={styles.image} source={profileimage ? { uri: profileimage.includes("http") ? profileimage : ImageUri + profileimage } : require('../images/profile_pictur.jpeg')} />
          <View style={styles.title}>
            <Text style={styles.text}>{alertContent(name, content)}</Text>
          </View>
          <Text style={styles.date}>{daysLeft} {daysLeftName} ago</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      name={item.name}
      profileimage={item.profileimage}
      active={item.active}
      content={item.content}
      date_time={item.date_time}
      daysLeft={item.daysLeft}
      daysLeftName={item.daysLeftName}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '6%',
    width: '95%',
    // alignItems: "center",
    // justifyContent:'center',

  },
  item: (width, i, active) => {
    // console.log("i",i)
    return {
      backgroundColor: active ? '#9FC0FA' : '#d5e5fe4d',
      height: '70%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width - 104,
      marginBottom: '18%',
      borderRadius: 10,
      padding: '2%',
      bottom: i == 0 ? 0 : (i*25)+'%',
      zIndex: 20
    }
  },
  itemContainer: () => {
    return {
      flexDirection: 'row',
      //  backgroundColor: active ? '#88B1F9' : '#d5e5fe4d',
    }
  },
  title: {
    justifyContent: 'flex-start',
    flexBasis: '69%',
    flexDirection: 'column',
    paddingTop: '3%',
    paddingLeft: '3%'
  },
  text: {
    fontSize: 16,

    // color:'white',
  },
  image: {
    width: 78,
    height: 80,
    marginTop: '3%',
    justifyContent: 'center',
    borderRadius: 1000,
    // alignSelf: 'flex-start',
    flexBasis: '30%',
    borderColor: "white",
    borderWidth: 2
  },
  date: {
    color: 'gray',
    marginLeft: '3.5%'
  }
});

export default AlertList;