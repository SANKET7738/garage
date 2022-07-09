import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import MarkerCallout from '../components/MarkerCallout';
import { BottomModalProvider, useBottomModal } from 'react-native-bottom-modal';

const ParkingScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    const [location, setLocation ] = useState(null);
    const [errorMsg, setErrorMsg ] = useState(null);
    const [loading,setLoading] = useState(true);
    const [listings, setListings ] = useState();

    const getActiveListings = () => {
        axios.get('http://10.0.2.2:5000/getActiveListings').then(resp => {
            let listings = resp.data.active_listings;
            setListings(listings)
            return listings
        })
    }

    useEffect(() => {
        (async () => {
            console.log("1")
            let { status } =  await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
                setErrorMsg('Permission to access location was denied');
                console.log("2")
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("dsdsdsdadasad");
            console.log(location);
            location.coords['latitudeDelta'] = 0.002;
            location.coords['longitudeDelta'] = 0.002;
            setLocation(location);
            console.log("here");
            console.log(location);
            getActiveListings()
            setLoading(false)
        })();
    }, []);


    console.log(location);

    if(loading) {
        <View style={Styles.conatiner}>
            <ActivityIndicator />
        </View>
    }

    return(
        <View style={Styles.conatiner}>
            <View style={Styles.topBar}>
                <Searchbar 
                    style={Styles.search}
                    placeholder="Search"
                />
            </View>
            {/* <MapView
                style={Styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            /> */}
            {location && 
                <MapView 
                    style={Styles.map}
                    mapPadding={{ left: 10, right: 10, bottom: 0, top: 80 }}
                    showsUserLocation={true}
                    initialRegion={location.coords}
                    provider={PROVIDER_GOOGLE}  
                >
                    {listings && listings.map((marker,index) => (
                        // <Marker
                        //     key={index}
                        //     coordinate={{
                        //         latitude: marker.coords.latitude,
                        //         longitude: marker.coords.longitude
                        //     }} 
                        // >
                        //     <Callout>
                        //             <MarkerCallout listingInfo={marker} navigation={navigation} />
                        //     </Callout>
                        // </Marker>
                         <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.coords.latitude,
                                longitude: marker.coords.longitude
                            }} 
                            onPress={() => navigation.navigate("View Details", {"listingInfo": marker, "navigation": navigation})}
                        >
                            <Callout>
                                    <MarkerCallout listingInfo={marker} navigation={navigation} />
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            }
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