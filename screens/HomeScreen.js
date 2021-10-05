import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';


const ParkingScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    const [location, setLocation ] = useState(null);
    const [errorMsg, setErrorMsg ] = useState(null);

    let mumbaiCoords = {
        'latitude': 19.0185924,
        'longitude' : 73.0943656,
        'latitudeDelta': 0.002,
        'longitudeDelta': 0.002,
    }
    useEffect(() => {
        (async () => {
            let { status } =  await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            location.coords['latitudeDelta'] = 0.002;
            location.coords['longitudeDelta'] = 0.002;
            setLocation(location);
        })();
    }, []);
    
    return(
        <View style={Styles.conatiner}>
            <View style={Styles.topBar}>
                <Searchbar 
                    style={Styles.search}
                    placeholder="Search"
                />
            </View>
            <MapView 
                style={Styles.map}
                mapPadding={{ left: 10, right: 10, bottom: 0, top: 80 }}
                showsUserLocation={true}
                initialRegion={location ? location.coords : mumbaiCoords}
                provider={PROVIDER_GOOGLE}  
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
    },
    topBar: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 20,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        width: '95%'
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
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, 
    }
})
export default ParkingScreen