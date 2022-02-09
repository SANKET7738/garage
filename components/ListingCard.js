import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function ListingCard({navigation, parkingSpace}) {
    console.log(parkingSpace)
  return (
      <View style={Styles.outercard}>
          <TouchableOpacity style={Styles.cardContainer} onPress={() => {navigation.navigate("View Details", {"parkingSpace": parkingSpace})}}>
              <View>
                <Ionicons name="location-sharp" size={30} color="#F50057" />
              </View>
              <View style={Styles.addressTextArea}>
                <Text>{parkingSpace.addressText}</Text>
              </View>
              <View>
              <MaterialIcons name="arrow-forward-ios" size={28} color="#F50057" />
              </View>

          </TouchableOpacity>
      </View>
  )
}

export default ListingCard;

const Styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        width: "90%",
        height: 100,
        justifyContent: "space-evenly",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2.5,
        marginVertical: 5,
    },
    outercard: {
       
    },
    addressTextArea: {
        width: "55%",
        alignItems: "center"
    }
    
})
