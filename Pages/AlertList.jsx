import React,{useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions,Image } from 'react-native';
import {ImageUri} from '../Routes/Url'
import Moment from 'moment';



let i=-1;


const Item = ({ id,name ,profileimage,active,content,date_time}) => {
  i++;
 return (
  <View style={styles.item(Dimensions.get("window").width,i)}>
   <Image style={styles.image}  source={profileimage ?{ uri:profileimage.includes("http")?profileimage:ImageUri +profileimage }:require('../images/profile_pictur.jpeg') } />
 <View style={styles.title}>
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.text}>{content}</Text>
    </View>
    <Text >{Moment(date_time).format('DD/MM/YYYY H:mm')}</Text>
  </View>
)};

const AlertList = (props) => {
  const {list}=props
  console.log("Lsit",list)

  useEffect(()=>{
    i=-1;
  })

  const renderItem = ({ item}) => (
    <Item
    id={item.id}
    name={item.name}
    profileimage={item.profileimage}
    active={item.active}
    content={item.content}
    date_time={item.date_time}
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
    marginTop:'6%',
    width:'95%',
    // alignItems: "center",
    // justifyContent:'center',
    
  },
  item:(width,i)=> {
    console.log("i",i)
    return{
      backgroundColor: '#d5e5fe4d',
      height:'70%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    width:width-104,
    marginBottom:'1%',
    borderRadius: 10,
    padding:'2%',
    bottom:i==0?0:'10%'
  }
},
  title: {
 justifyContent:'flex-start',
    flexBasis:'69%',
    flexDirection:'column',
    paddingTop:'3%',
    paddingLeft:'3%'
  },
  text:{
    fontSize: 20,
    // color:'white',
  },
  image: {
    width: 78,
    height: 80,
    paddingTop:'3%',
    justifyContent:'center',
    borderRadius: 1000,
    // alignSelf: 'flex-start',
    flexBasis:'30%',
    borderColor: "white",
    borderWidth: 2
},
});

export default AlertList;