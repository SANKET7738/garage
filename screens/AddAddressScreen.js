import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { parkingSpaceUpdateCoords } from '../redux/actions';
import { parkingSpaceUpdateAddressText } from '../redux/actions';

Geocoder.init(process.env.GEOCODER_API_KEY);
Geocoder.init('AIzaSyDS52u44MIJ9yPoWOUKvq5OLpQI0pQtKU0');

console.log(process.env.GEOCODER_API_KEY)

const AddAddressScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const addressState = useSelector(state => state.addressState);
    const [location, setLocation ] = useState(null);
    const [address, setAddress] = useState(null);
    let mumbaiCoords = {
        'latitude': 19.0185924,
        'longitude' : 73.0943656,
        'latitudeDelta': 0.002,
        'longitudeDelta': 0.002,
    }

    useEffect(() => {
        (async() => {
            let location = await Location.getCurrentPositionAsync({});
            // location object 
            // Object {
            //     "coords": Object {
            //       "accuracy": 5.019000053405762,
            //       "altitude": 5,
            //       "altitudeAccuracy": 0.5,
            //       "heading": 90,
            //       "latitude": 37.4219983,
            //       "latitudeDelta": 0.002,
            //       "longitude": -122.084,
            //       "longitudeDelta": 0.002,
            //       "speed": 0,
            //     },
            //     "mocked": false,
            //     "timestamp": 1643551858235,
            //   }
           
            location.coords['latitudeDelta'] = 0.002;
            location.coords['longitudeDelta'] = 0.002;
            setLocation(location);
            dispatch(parkingSpaceUpdateCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }))
            getAddress(location.coords);
        })();
    }, []);

    const updateLocation = (location) => {
        // location : {
        //     "latitide": something,
        //     "longitude": something
        // }
        setLocation(location)
        dispatch(parkingSpaceUpdateCoords(location))
        getAddress(location)
        console.log(addressState);
    }

    const getAddress = (coords) => {
        Geocoder.from(coords.latitude, coords.longitude).then(json => {
                var addressComponent = json.results[0];
                let formattedAddress = addressComponent.formatted_address;
                let addressHeader = addressComponent.address_components[0].long_name;
                setAddress({
                    "addressTitle": addressHeader,
                    "addressText": formattedAddress
                })
                dispatch(parkingSpaceUpdateAddressText(formattedAddress))
            })
            .catch(error => console.log(console.error()));
    }

    if(location){
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={location.coords} 
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker draggable
                        coordinate={location.coords}
                        onDragEnd={(e) => updateLocation(e.nativeEvent.coordinate)}
                    />
                </MapView>
                <View style={styles.addressArea}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Confirm delivery location</Text>
                    </View>
                    <View style={styles.address}>
                        {address ? 
                            <View>
                                <Text style={styles.addressTitle}>{address.addressTitle}</Text>
                                <Text style={styles.addressText}>{address.addressText}</Text>
                            </View>
                         : <ActivityIndicator/>}
                    </View>
                    <View style={styles.addAddressButton}>
                        <TouchableOpacity onPress={() => navigation.navigate("Parking Space Details", {"addressText": address.addressText })}>
                            <Text style={styles.buttonText}>Save address</Text>
                        </TouchableOpacity>
                    </View>
    
                </View>
            </View>
            
        )
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" style={{height: 50}} />
        </View>
    )
    }

export default AddAddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height * 0.6, 
    },
    addressArea: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    header: {
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 9,
        paddingLeft: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4",
        shadowColor: "#171717",
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,

    },
    headerText: {
        fontSize: 18,
    },
    address: {
        margin: 5,
        marginHorizontal: 10,
        height: 70,
    },
    addressTitle: {
        fontSize:15,
        color: "black",
        fontWeight: "bold",
        margin: 1,
    },
    addressText: {
        margin: 1,
        fontSize: 13,

    },
    addAddressButton: {
        width: "95%",
        alignItems: "center",
        backgroundColor: "#F50057",
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    }

})
