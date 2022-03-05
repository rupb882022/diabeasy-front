import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Card from '../../CTools/Card';
import FlipCard from 'react-native-flip-card'
import Input from '../../CTools/Input';
import { Ionicons } from '@expo/vector-icons';


export default function ingredient(props) {
  const { name, image, index } = props
  const [favorite, setFavorite] = useState(false);


  return (
    <View style={styles.container}>
       {/* {favorite?
        <TouchableOpacity onPress={()=>setFavorite(false)}> <Ionicons name="heart-sharp" size={24} color="black" /> </TouchableOpacity> : 
        <TouchableOpacity onPress={()=>setFavorite(true)}> <Ionicons name="heart-outline" size={24} color="black" /> </TouchableOpacity>
        } */}
      <FlipCard
        // style={styles.card(index)}
        friction={15} //The friction of card animation
        perspective={1000} //The amount of perspective applied to the flip transformation
        flipHorizontal={true}
        flipVertical={false} //If you set false, a card not flip to vertical. If you set true both flipHorizontal and flipVertical , a card flip to diagonal.
        flip={false}  //start side flase=face true=back
        clickable={true}>
        <View style={styles.face}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
         <Text style={{ fontSize: 25, textAlign: 'center',paddingLeft:'13%' }}>{name}
         </Text>
         {favorite?
          <TouchableOpacity onPress={()=>setFavorite(false)}><Ionicons style={styles.icon} name="heart-sharp" size={24} color="black" /></TouchableOpacity> :
          <TouchableOpacity onPress={()=>setFavorite(true)}><Ionicons style={styles.icon} name="heart-outline" size={24} color="black" /></TouchableOpacity> 
         }
         </View>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.textFront}>30.5 Carbs 100g</Text>
        </View>

        <View style={styles.back}>
          <Text style={styles.backTitle}>Carbohydrates: 34</Text>
          <View style={{ width: '90%' }}>
            <Input
              label='Unit of measure'
              height={40}
              width={100}
              editable={false}
              type='selectBox'
              SelectBox_placeholder='Select Unit of measure'
              selectBox_items={[
                { itemKey: 0, label: 'unit', value: 'unit' },
                { itemKey: 1, label: 'grams', value: 'grams' },
                { itemKey: 2, label: 'cup', value: 'cup' },
              ]} />
            <Input
              label='amount'
              validtion='number'
              keyboardType='decimal-pad'
              height={40}
              width={100}
            />
          </View>
        </View>
      </FlipCard>
    </View>






    // <View style={styles.container}>
    // <Card
    //   name={name}
    //   image={image}
    //   index={index}
    // />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
    paddingLeft: '3%',
    width: '50%'
  },
  image: {
    width: '80%',
    height: '70%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  face: {
    width: 160,
    height: 160,
    backgroundColor: 'white'
  },
  faceTitle: {
    fontSize: 20,
    textAlign: 'center',

  },
  back: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#FFCF84",
    paddingTop: '5%'
  },
  backTitle: {
    marginBottom: '2%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textFront: {
    textAlign: 'center',
    backgroundColor: "#FFCF84",

  },
  icon:{
alignSelf:'flex-end',
left:'70%' 
 }
})
