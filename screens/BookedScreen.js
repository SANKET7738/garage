import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import FormButton from '../components/FormButton';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookedScreen = (params) => {
    if (params.route.params == undefined) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}} >
                <Text>No Bookings yet</Text>
            </View>
        )
    }

    if (params.route.params !== undefined) {

        const user = useSelector(state => state.userState.currentUser);
        
        let listingInfo = params.route.params.listingInfo;
        
        let selectedVehicle = params.route.params.selectedVehicle;
        
    
        function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
          }
    
        let availableFrom = formatAMPM(new Date(listingInfo.available_from))
        let availableTo = formatAMPM(new Date(listingInfo.available_to))

        return(
            <View style={Styles.container}>
                <View style={{height: 170, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Image 
                        style={{ height: 120, width: 120}}
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        }}
                    />
                </View>
                <View style={Styles.row}>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start"}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>Name</Text>
                            <Text style={{fontSize: 18, marginTop: 4 }}>{user.name}</Text>
                        </View>
                    </View>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start", marginLeft: 10}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>Phone No</Text>
                            <Text style={{fontSize: 18, marginTop: 4}}>{user.phoneNo}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start"}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>Vehicle</Text>
                            <Text style={{fontSize: 18, marginTop: 4 }}>{selectedVehicle.company} {selectedVehicle.model}</Text>
                        </View>
                    </View>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start", marginLeft: 10}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>Vehicle No</Text>
                            <Text style={{fontSize: 18, marginTop: 4}}>{selectedVehicle.registeratioNo}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start"}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>From</Text>
                            <Text style={{fontSize: 18, marginTop: 4 }}>{availableFrom}</Text>
                        </View>
                    </View>
                    <View style={{ width: "50%", flexDirection: "row", justifyContent: "flex-start", marginLeft: 10}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>To</Text>
                            <Text style={{fontSize: 18, marginTop: 4}}>{availableTo}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: -8}}>
                        <View>
                            <Text style={{color: "#6F6D6D"}}>Parking Address</Text>
                            <Text style={{fontSize: 16, marginTop: 4}}>{listingInfo.addressText}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", marginLeft: -163}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontSize:18}}>Amount to pay:</Text>
                            <Text style={{fontSize: 18, marginLeft: 10, color: "#F50057"}}>{listingInfo.rent_per_hour}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.row}>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{marginRight: 40}}>
                            <FontAwesome5 name="phone-alt" size={24} color="#F50057" /> 
                        </View>
                        <View style={{marginLeft: 50, marginRight: 50}}>
                            <FontAwesome5 name="directions" size={24} color="#F50057" />
                        </View>
                        <View style={{marginLeft: 40}}>
                            <MaterialCommunityIcons name="cctv" size={24} color="#F50057" />
                        </View>
    
                    </View>
                </View>
                <View style={{ marginTop: 10}}>
                    <FormButton buttonTitle={"Pay"} />
                </View>
                
            </View>
        )
    }

    
}

export default BookedScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    addressRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
    },
    addressRowTextArea : {
        width: "70%",
        marginLeft: 25,
    },
    addressRowText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 40,
    }

})