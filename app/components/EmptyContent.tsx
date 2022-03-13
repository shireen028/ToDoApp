import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');

export const EmptyContent = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('assets/empty.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: height - 56,
  },
  image: {
    width: 300,
    height: 280,
  },
});
