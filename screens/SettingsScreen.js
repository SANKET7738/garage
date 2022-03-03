import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    return(
        <View style={Styles.container}>
            <View style={Styles.top}>
                <Text style={Styles.heading}>My Account</Text>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center'}}>
                    <FontAwesome name="user" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile') }>
                        <Text>My Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <FontAwesome5 name="car" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Vehicle Details')}>
                        <Text>Vehicle Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Foundation name="credit-card" size={28} color="#F50057" />
                </View >
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text>Payments</Text>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Ionicons name="location-sharp" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Parking Spaces') }>
                            <Text>Parking Spaces</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SettingsScreen

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    top: {
        height: "25%",
        justifyContent: 'center',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 20
    },
    row: {
        height: "10%",
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: 40
    },
    modal: {
        borderRadius:20,
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent:'space-between',
        alignItems: 'center',
        padding: 40,
    },
    dropdown: {
        height: 60,
        width: 300,
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        fontSize: 18,
        borderBottomWidth: 0    
    }
})