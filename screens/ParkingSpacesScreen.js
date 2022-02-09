import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import  AddressCard  from '../components/AddressCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ParkingSpacesScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser)
    const [ parkingSpaces, setParkingSpaces ] = useState()
    const [ loading, setLoading ] = useState(true)

    const getParkingSpaces = (uid) => {
        axios.post(
            'http://10.0.2.2:5000/getAllParkingSpaces',
            {"uid": uid}
        )
        .then((response) => {
            console.log(response.data)
            setParkingSpaces(response.data.parking_spaces_list)
            setLoading(false)
        })
        .catch((error) => console.log(error) )
    }

    useEffect(() => {
        getParkingSpaces(user.uid)
    },[]);
    

    if(parkingSpaces){
        console.log(parkingSpaces)
    }

    if (loading) {
        return (
            <View style={Styles.container}> 
                <ActivityIndicator size="large" color="#F50057"/>
            </View>
        )
    }


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
                {parkingSpaces && parkingSpaces.map(parkingSpace => (
                    <AddressCard props={parkingSpace} />
                ))}
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