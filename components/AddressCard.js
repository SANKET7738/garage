import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressCard = () => {
    return (
        <View StyleSheet={Styles.cardContainer}>
            <View style={Styles.icon}>
                <Ionicons name="location-sharp" size={24} color="black" />
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
     height: "200px",
     borderWidth: 1,
     borderColor: "black",
    },
    icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "20%",
    },
    addressTextArea: {
       marginLeft: "20%",
    },
    addressTitle: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        margin: 5,
    },
    addressText: {
        margin: 5,
        fontSize: 14,

    }
})
