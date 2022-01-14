import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressCard = () => {
    return (
        <View style={Styles.cardContainer}>
            <View style={Styles.icon}>
                <Ionicons name="location-sharp" size={30} color="#F50057" />
            </View>
            <View style={Styles.addressTextArea}>
                <Text style={Styles.addressTitle}>Home</Text>
                <Text style={Styles.addressText}>102; Varad Vinayak Niwas; Plot no: 24, Sec- 10; Kamothe; Navi Mumbai; Kamothe</Text>
            </View>
        </View>
    )
};

export default AddressCard;

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
      width: "70%",
    },
    addressTitle: {
        fontSize:20,
        color: "black",
        fontWeight: "bold",
        margin: 5,
    },
    addressText: {
        margin: 5,
        fontSize: 14,

    }
})
