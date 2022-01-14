import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import  AddressCard  from '../components/AddressCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ParkingSpacesScreen = ({navigation}) => {
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.addAddressView}>
                <TouchableOpacity onPress={() => navigation.navigate("AddAddress")}>
                    <View>
                        <AntDesign name="plus" size={28} color="#F50057" /> 
                    </View>

                </TouchableOpacity>
                <Text style={Styles.addAddressViewText}>Add address</Text>
            </View>
            <View>
                <AddressCard/>
                <AddressCard/>
            </View>
        </SafeAreaView>
    )
}

export default ParkingSpacesScreen

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addAddressView : {
        padding: 20,
        borderColor: '#C4C4C4',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
    },
    addAddressViewText : {
        color: "#F50057",
        fontSize: 20,
        marginLeft: 20,
    },
})