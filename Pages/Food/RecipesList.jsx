import { ScrollView, Text, StyleSheet,View } from 'react-native'
import React from 'react'

import Recipe from './Recipe'



export default function RecipesList() {

  const list = json.map((x, i) =>
    <Recipe key={i} name={x.name} image={x.image} index={i} />
  );

  return (
    <ScrollView style={styles.container}>
      {list}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      // flex: 10,
      // flexWrap:'wrap',
      // flexDirection:'row',

  },
})