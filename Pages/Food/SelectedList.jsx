import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import PopUp from '../../CTools/PopUp';

export default function SelectedList(props) {

  const{myFoodList,myFoodDtails,setShow,show,addToMyListFood}=props

  const ListElement = myFoodList.length > 0 ? <>{myFoodList.map((x, i) => <View key={i} style={{ alignSelf: 'flex-start' }}>
  <View style={styles.listRow}>
      <TouchableOpacity onPress={() => { addToMyListFood({ id: x.id, name: x.name, carbs: x.carbs, suger: x.suger, add: false }) }}
      ><Text style={styles.exit}> X</Text></TouchableOpacity>
      <Text style={styles.mylistvar}>{x.name}</Text>
      <Text style={styles.mylist}> Carbohydrates:</Text><Text style={styles.mylistvar}>{x.carbs}</Text>
      <Text style={styles.mylist}> Suger:</Text><Text style={styles.mylistvar}>{x.suger}</Text>
  </View>
</View>)}
  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text>Total Carbohydrates: {myFoodDtails.carbs} Suger: {myFoodDtails.suger}</Text>
  </View></>
  : <View style={{ flex: 1 }}><Text>list is empty</Text></View>;

  return (
    <PopUp
    show={show}
    setShow={setShow}
    backgroundColor='#d6f2fc'
    width={95}
    height={60}
    element={ListElement}
/>
  )
}

const styles = StyleSheet.create({

  mylist: {
      paddingLeft: '2%',
      fontSize: 15
  },
  mylistvar: {
      fontWeight: 'bold',
      fontSize: 15
  },
  exit: {
      textAlign: 'right',
      paddingRight: '2%',
      color: 'red',
      fontWeight: 'bold',
      fontSize: 16,
  }, listRow: {
      flexDirection: 'row',
      paddingTop: '5%',
      paddingBottom: '2%',
      width: 300,
      borderBottomWidth: 1,
      borderRadius: 10,
      flexWrap: 'wrap'
  }
})