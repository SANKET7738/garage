import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Svg, Image as ImageSvg} from 'react-native-svg';

const MarkerCallout = ({listingInfo, navigation}) => {
  const refreshPage = React.useCallback(() => updateState({}), []);
  const [, updateState ] = React.useState();
  let imageUri = String(listingInfo.images[0])
  
  useEffect(() => {
    refreshPage()
  }, [])

  return (
    <View style={styles.container}>
        <View>
          <Svg width={250} height={140}>
            <ImageSvg
              width={'100%'}
              height={'100%'}
              preserveAspectRatio="xMidYMid slice"
              href={{ uri : listingInfo.images[0]}}
            />
          </Svg>
        </View>
        <View style={styles.textArea}>
          <Text>{listingInfo.addressText}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginBottom: 10}}>
          <View style={{ flexDirection: "row"}}>
            <Text style={{ fontWeight: "bold", marginRight: 10}}>Rent</Text>
            <Text style={{ fontWeight: "bold", color:"#F50057"}}>{listingInfo.rent_per_hour}</Text>
          </View>
          <View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Booking')}
            >
              <Text style={{ color: "white", fontWeight: "bold"}}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

export default MarkerCallout 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 250,
    },
    textArea : {
      justifyContent: "center",
      margin: 10,
    },
    button :{
      margin: 5,
      paddingVertical: 5,
      width: 80,
      backgroundColor: "#F50057",
      alignItems: "center",
      borderRadius: 10,
  },

})