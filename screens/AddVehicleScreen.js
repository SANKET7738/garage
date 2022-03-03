import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { TextInput } from 'react-native-paper';

function AddVehicleScreen({navigation}) {
    const user = useSelector(state => state.userState.currentUser);
    const [brandSelected, setBrandSelected ] = useState(null);
    const [carDetails, setCarDetails ] = useState();
    
    let addCarDetails = {}

    let brandList = [];
    axios.get('http://10.0.2.2:5000/getBrands')
         .then((response) => {
             response.data.brands.map((brand) => {
                 brandList.push({
                     "value": brand,
                 })
             })
         })
         .catch((error) => console.log(error));
    
    let modelList = [];
    if(brandSelected){
        axios.post(
            'http://10.0.2.2:5000/getBrandList',
            {
                "brand" : brandSelected,
            }
        )
        .then((response) => {
            response.data.brand_list.map((model) => {
                modelList.push({
                    "value": model,
                })
            })
        })
    }

    const updateCarDetails = (addCarDetails) => {
        setCarDetails(addCarDetails);
        var postData = {
            "carDetails" : addCarDetails,
            "uid": user.uid, 
        };
        console.log(postData);

        (async() => {
            const resp = await fetch('http://10.0.2.2:5000/addVehicle',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const content = await resp.json();
            console.log(content);
        })();

        navigation.navigate("Vehicle Details")
    }

    return (
        <SafeAreaView>
            <Dropdown
                label="Company"
                // value={carDetails.company}
                data={brandList}
                style={Styles.dropdown}
                
                onChangeText={(v) => {
                    setBrandSelected(v)
                }}
            />
            <Dropdown
                label="Model"
                // value={carDetails.company}MaterialIcons
                data={modelList}
                style={Styles.dropdown}
                onChangeText={(v) => {
                    addCarDetails["model"] = v
                    addCarDetails["company"] = brandSelected
                }}
            />
            <TextInput 
                placeholder="Registeration No"
                style={Styles.input}
                onChangeText={(v) => {
                    addCarDetails["registeratioNo"] = v
                }}
            />
            <FormButton buttonTitle={"Done"} 
                onPress={() => {
                    updateCarDetails(addCarDetails);
                }} 
            />
        </SafeAreaView>
    )
}

export default AddVehicleScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    dropdown: {
        height: 60,
        width: "95%",
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        fontSize: 18,
        borderBottomWidth: 0,
        backgroundColor: "white",
    },
    input :{
        backgroundColor: 'white',
        height: 60,
        minWidth: 300,
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        fontSize: 18,
        fontFamily: 'Montserrat_400Regular',

    }
})