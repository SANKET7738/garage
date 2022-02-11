import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MarkerCallout = (props) => {
    console.log(props)
  return (
    <View>
        <Text>{props.addressText}</Text>
    </View>
  )
}

export default MarkerCallout 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})