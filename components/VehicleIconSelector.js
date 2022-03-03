import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


function VehicleIconSelector(params) {
    console.log(params);
  return (
    <View style={Styles.cardContainer}>
        <View style={Styles.icon}>
            <FontAwesome5 name="car" size={30} color="#F50057" />
        </View>
        <View>
            <Text>{params.props.company} {params.props.model}</Text>
            <Text>{params.props.registeratioNo}</Text>
        </View>
        
    </View>
  )
}

export default VehicleIconSelector;


const Styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        marginVertical: 1,
        paddingVertical: 5,
        backgroundColor: "white",
        width: 200,
        margin: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: "center",
        height: 80,
    },
    icon: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
    addressTextArea: {
        width: "60%",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
    },
    addressTitle: {
        fontSize:20,
        color: "black",
        fontWeight: "bold",
        margin: 5,
    },
    addressText: {
        margin: 5,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
  
    }
})