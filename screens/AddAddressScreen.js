import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AddAddressScreen = ({navigation}) => {
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
            location.coords['latitudeDelta'] = 0.002;
            location.coords['longitudeDelta'] = 0.002;
            setLocation(location);
            getAddress(location);
        })();
    }, []);

    const updateLocation = (location) => {
        setLocation(location)
        getAddress(location)
    }

    const getAddress = (coords) => {
        let latlang= `${coords.latitude},${coords.longitude}`
        
        Geocoder.from(latlang).then(json => {
                var addressComponent = json.results[0];
                let formattedAddress = addressComponent.formatted_address;
                let addressHeader = addressComponent.address_components[0].long_name;
                setAddress({
                    "addressTitle": addressHeader,
                    "addressText": formattedAddress
                })
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
            <ActivityIndicator />
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
