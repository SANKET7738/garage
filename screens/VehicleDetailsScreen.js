import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import VehicleCard from '../components/VehicleCard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

function VehicleDetailsScreen({navigation}) {
    const user = useSelector(state => state.userState.currentUser);
    const [ vehicleList, setVehicleList ] = useState();
    const dispatch = useDispatch()

    const getVehicleList = (uid) => {
        var postData = {
            "uid" : uid,
        };
        (async() => {
            const resp = await fetch('http://10.0.2.2:5000/getUserVehicles', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const content = await resp.json();
            setVehicleList(content.vehicle_list);
            user["vehicle_list"] = content.vehicle_list;
            dispatch(setUser(user));
            
        })();
    }

    useEffect(() => {
        getVehicleList(user.uid);
    },[]);

  return (
    <View style={Styles.container}> 
        <View style={Styles.addVehicleView}>
            <TouchableOpacity onPress={() => navigation.navigate("Add Vehicle")}>
                <View>
                    <AntDesign name="plus" size={28} color="#F50057" /> 
                </View>
            </TouchableOpacity>
            <Text style={Styles.addVehicleViewText}>Add Vehicle</Text>
        </View>
        <View>
            {vehicleList && vehicleList.map(vehicle => (
                <VehicleCard props={vehicle}/>
            ))}
        </View>
    </View>
  )
}

export default VehicleDetailsScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addVehicleView : {
        padding: 20,
        borderColor: '#C4C4C4',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
    },
    addVehicleViewText : {
        color: "#F50057",
        fontSize: 20,
        marginLeft: 20,
    },
    
})