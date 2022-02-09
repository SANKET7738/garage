import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { parkingSpaceUpdateOwnershipType, parkingSpaceUpdateCompleteAddress, parkingSpaceUpdateLandmark } from '../redux/actions';


function ParkingSpaceDetailsScreen({ route, navigation}) {
    const dispatch = useDispatch()
    const addressState = useSelector(state => state.addressState)
    console.log(addressState)
    const [completeAddress, setCompleteAddress] = useState()
    const [ landmark, setLandmark] = useState()
    const [ownershipType,setOwnershipType] = useState()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputField}>
                <View style={styles.changeRow}>
                    <Text style={styles.inputFieldTitle}>Your Location</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AddAddress")}>
                        <Text style={styles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                </View>
                <FormInput 
                    placeholderText="Your Location"
                    defaultValue={addressState.addressText}
                />
            </View>
            <View style={styles.inputField}>
                <FormInput 
                    placeholderText="Complete Address"
                    onChangeText={(e) => {
                        setCompleteAddress(e)
                    }}
                />
            </View>
            <View style={styles.inputField}>
                <FormInput 
                    placeholderText="Nearby landmark (Optional)"
                    onChangeText={(e) => {
                        setLandmark(e)
                    }}
                />
            </View>
            <View style={styles.inputField}>
                <Dropdown 
                    label="Ownership Type"
                    data={[
                        {
                            value: "Private",
                        }, 
                        {
                            value: "Commercial",
                        }
                    ]}
                    style={styles.dropdown}
                    onChangeText={(v) => {
                        setOwnershipType(v)
                    }}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 5, width: "95%"}}>
                <FormButton 
                    onPress={() => {
                        dispatch(parkingSpaceUpdateLandmark(landmark))
                        dispatch(parkingSpaceUpdateOwnershipType(ownershipType))
                        dispatch(parkingSpaceUpdateCompleteAddress(completeAddress))
                        navigation.navigate("Parking Space Photos")
                    }}
                    buttonTitle={"Add Photos"}
                />
            </View>
            
        </SafeAreaView>
    )
}

export default ParkingSpaceDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    inputField: {
        width: "98%",
        marginVertical: 5,
    },
    inputFieldTitle : {
        marginLeft: 15,
    }, dropdown: {
        height: 50,
        // width: 300,
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        fontSize: 18,
        borderBottomWidth: 0    
    }, changeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 15,
        marginTop: 10,
    }, changeButtonText: {
        color: "#F50057"
    }
})
