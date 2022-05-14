import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { get_alerts } from '../Functions/Function'
import { UserContext } from './UserDetailsHook'
import PopUp from './PopUp';
import AlertList from '../Pages/AlertList';

export default function Information() {
  const { userDetails } = useContext(UserContext);
  const [alerts, setAlert] = useState();
  const [show, setShow] = useState();

  const getContent = () => {
    switch (content) {
      case forum - comment:
        return 'forum-comment'
      default:
        break;
    }
  }
  const alertElement =
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { setShow(false) }}
        style={styles.exit}>
          <Text style={styles.exit}>X</Text>
          </TouchableOpacity>
          <AlertList
          list={alerts}
          />
    </View>

  useEffect(() => {
    userDetails && get_alerts(userDetails.id).then((response) => {
      response && setAlert(response)
    })
  }, [])

  return (<>
    <View style={styles.iconsRow}>
      <TouchableOpacity
        style={styles.Secoundicon}
      >
        <Ionicons name="ios-information-circle-outline" size={40} color="#1ea6d6" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ zIndex: 5 }}
        onPress={() => { setShow(true) }}
      >
        <Ionicons name="ios-notifications-circle-outline" size={40} color="#1ea6d6" />
      </TouchableOpacity>
    </View>
    {show && <PopUp
      element={alertElement}
      isButton={false}
      show={true}
      alignItems='flex-end'
      justifyContent='flex-start'
      style='information'
      width={90}
      height={70}
    />}
  </>
  )
}
const styles = StyleSheet.create({
  iconsRow: {
    flexDirection: 'row',
    marginTop: '19%',
    position: 'absolute',
    zIndex: 5,
    alignSelf: 'flex-end',
    marginRight: '2%'

  }, Secoundicon: {
    marginRight: '3%',
    right: '10%'
  },
  exit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    direction:'rtl',
    fontSize:20,
    fontWeight:'bold',
    right:'2%',
    top:'-1%'
  }
})