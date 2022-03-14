import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../CTools/Button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../../CTools/Input';
import Header from '../../CTools/Header';


export default function AddNewFood(props) {
  const { navigation, route } = props
  let categoryList = route.params.categoryList;
  let isRecipe=route.params.isRecipes;

  return (
    <View style={styles.container}>
      <Header
      title={isRecipe?'Add Recipe':'Add Ingredient'}
      marginLeft={isRecipe?0:7}
      line={false}
      possiton={-15}
      />
      <Input
      />
      <Input
      />
      <Input
      />
      <Input
      />
      <Input
      />
      <Input
      />
      <View style={styles.row}>
        <View style={styles.uploadbutton}>
          <Text>Upload image</Text>
          <Button
            element={<MaterialCommunityIcons name="camera-plus-outline" size={30} color="black" />}
            width={8}
            height={4}
            onPress={() => { navigation.navigate('CameraUse', { imageName: user == 'Doctor' ? 'profileDoctor' : 'profilePatient' }) }}
          />
        </View>
        <View style={styles.buttons}>
        <Button
          height={6}
          width={20}
          text='save'
          justifyContent='center'
          onPress={() => navigation.goBack()}
        />
        <Button
          height={6}
          width={8}
          text='back'
          justifyContent='center'
          onPress={() => navigation.goBack()}
        />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex:1
  },
  uploadbutton: {
    flex: 1,
    paddingLeft: '12%'
  },buttons:{
    flex:2.2,
    flexDirection:'row',
    marginBottom:'6%'
  }
})