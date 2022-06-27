import React, { useEffect, useState ,useContext} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { ImageUri } from '../Routes/Url'
import { readAlert } from '../Functions/Function'
import { UserContext } from '../CTools/UserDetailsHook';


let i = -1;

const AlertList = (props) => {
  const { list, navigation, setShow } = props

  useEffect(() => {
    i = -1;
  })

  const { userDetails,setUserDetails } = useContext(UserContext);


  const alertContent = (name, content) => {
    switch (content) {
      case "forum-comment":
        return `you got new respone on your comment by ${name}`
      case "forum-subject":
        return `${name} add new comment in the same subject that you comment about`
      case "addPrescription":
        return `${name} ask for new prescription`
      case "statusPrescription":
        return `your prescription requests change status by ${name}`
        case "fixReport":
        return "The reported issue has been fixed"
      default:
        return '';
        break;
    }
  }
  const navigationTo = (content, id) => {
    readAlert(id).then((response) => {
      if (response) {
        content=='addPrescription'&&setUserDetails({...userDetails,patientID:response});
        setShow();
        switch (content) {
          case "forum-comment":
            navigation.navigate('Forum')
            break;
          case "forum-subject":
            navigation.navigate('Forum')
            break;
          case "addPrescription":
            navigation.navigate('Prescriptions')
            break;
          case "statusPrescription":
            navigation.navigate('Prescriptions')
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
    console.log(content=="fixReport"?ImageUri+'diabeasy_logo.png': profileimage ? { uri: profileimage.includes("http") ? profileimage : ImageUri + profileimage } : require('../images/profile_pictur.jpeg'))

    return (
      <TouchableOpacity onPress={() => { navigationTo(content, id); }} style={styles.itemContainer(active)}>
        <View id={id} style={styles.item(Dimensions.get("window").width, i, active)}>
          <Image style={styles.image('white')} source={content=="fixReport"?{uri:ImageUri+'diabeasy_logo.png'}: profileimage ? { uri: profileimage.includes("http") ? profileimage : ImageUri + profileimage } : require('../images/profile_pictur.jpeg')} />
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
      backgroundColor: active ? '#9fc0fabd' : '#ffffffe0',
      height: '70%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width - 104,
      marginBottom: '18%',
      borderRadius: 10,
      padding: '2%',
      bottom: i == 0 ? 0 : (i * 25) + '%',
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
  image: (backgroundColor)=>{
    return{width: 78,
    height: 80,
    marginTop: '3%',
    justifyContent: 'center',
    borderRadius: 1000,
    // alignSelf: 'flex-start',
    flexBasis: '30%',
    borderColor: "white",
    borderWidth: 2,
    backgroundColor:backgroundColor
    
  }},
  date: {
    color: 'gray',
    marginLeft: '3.5%'
  }
});

export default AlertList;