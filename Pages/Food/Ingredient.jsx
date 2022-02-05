import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Card from '../../CTools/Card';

export default function ingredient(props) {
  const { name, image,index } = props

  return (
    <View style={styles.container}>
      <Card
        name={name}
        image={image}
        index={index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '50%',
    height: '80%',
  }

})
