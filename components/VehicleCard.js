import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function VehicleCard(params) {
    console.log(params);
  return (
    <View style={Styles.cardContainer}>
        <View style={Styles.icon}>
            <FontAwesome5 name="car" size={30} color="#F50057" />
        </View>
        <View style={Styles.addressTextArea}>
                {/* <Text style={Styles.addressTitle}>Home</Text> */}
                <Text style={{ fontSize: 18, fontWeight: "bold"}}>{params.props.company}  {params.props.model}</Text>
                <Text style={Styles.addressText}>{params.props.registeratioNo}</Text>
            </View>
    </View>
  )
}

export default VehicleCard;

const Styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        marginVertical: 1,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    icon: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
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