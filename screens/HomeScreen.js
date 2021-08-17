import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ParkingScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    
    return(
        <View style={Styles.conatiner}>
            <View style={Styles.topBar}>
                <Searchbar 
                    style={Styles.search}
                    placeholder="Search"
                />
                <TouchableOpacity style={Styles.menu}>
                    <Ionicons name="menu" size={36} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
    },
    topBar: {
        marginTop: 40,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    search: {
        width: '85%'
    },
    menu : {
        margin: 10,
        borderRadius: 5,
        padding: 4,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
export default ParkingScreen