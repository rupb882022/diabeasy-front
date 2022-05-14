import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
console.log("width",Dimensions.get("window").width)
const Item = ({ title }) => (
  <View style={styles.item(Dimensions.get("window").width)}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const AlertList = (props) => {
  const {list}=props
  console.log("Lsit",list)
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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
    width:'90%',
    alignItems: "center",
    justifyContent:'center',
  },
  item:(width)=> {
    return{
      backgroundColor: '#f9c2ff',
      height:'80%',
    width:width-105,
    marginVertical:'1%',
    borderRadius: 10,
    padding:'2%'
  }
},
  title: {
    fontSize: 20,
  },
});

export default AlertList;