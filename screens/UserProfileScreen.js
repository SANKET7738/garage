import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Dropdown } from 'react-native-material-dropdown-v2';
import axios from 'axios';
import { combineReducers } from 'redux';

const UserProfileScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    const [isModalVisible, setModalVisible] = useState(false);
    const [brandSelected, setBrandSelected ] = useState(null);
    const [carDetails, setCarDetails ] = useState(user.carDetails ? user.carDetails: {
        "company": "",
        "model" : "",
        "registeratioNo" : "",
    });

   
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    
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

    let addCarDetails = {}

    const updateCarDetails = (carDetails) => {
        // console.log(user.uid);
        // console.log(carDetails);
        setCarDetails(carDetails);
        carDetails.uid = user.uid;
        axios.post(
            'http://10.0.2.2:5000/addVehicle',
            carDetails
        )
        .then((response) => {
            console.log("here");
            console.log(response.msg);
        })
    }   
    
    return(
        <View style={Styles.container}>
            <View style={Styles.profileTop}>
                <View style={Styles.profileImage}>
                    <Image style={Styles.image} source={{uri: "https://i.imgur.com/0o9BZ24.png"}} />
                    <TouchableOpacity style={Styles.camera}>
                        <Ionicons name="ios-camera-sharp" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={Styles.username}>{user.name}</Text>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center'}}>
                    <MaterialCommunityIcons name="email" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text>{user.email}</Text>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <FontAwesome5 name="phone-alt" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text>{user.phoneNo}</Text>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Foundation name="lock" size={28} color="#F50057" />
                </View >
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text>********</Text>
                </View>
            </View>
            <View style={Styles.row}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <FontAwesome name="car" size={28} color="#F50057" />
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text>{carDetails.registeratioNo}</Text>
                </View>
                <MaterialIcons name="edit" size={24} color="#F50057" onPress={toggleModal} />
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={Styles.modal}>
                    <View>
                        <Dropdown
                            label="Company"
                            // value={carDetails.company}
                            data={brandList}MaterialIcons
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
                        <FormInput
                            placeholderText="Registeration No"
                            // value={carDetails.registeratioNo}
                            defaultValue={carDetails.registeratioNo}
                            onChangeText={(v) => {console.log(carDetails);
                                addCarDetails["registeratioNo"] = v
                            }}
                        />
                    </View>
                    <FormButton buttonTitle={"Done"} 
                        onPress={() => {
                            updateCarDetails(addCarDetails);
                            toggleModal();
                        }} 
                    />
                </View>
            </Modal>
        </View>
    )
}

export default UserProfileScreen;

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    profileTop: {
        height: "30%",
        padding: 20,
        margin:10,
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },
    profileImage: {
        backgroundColor: "#C4C4C4",
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 120,
        width: 120,
        marginRight: 20,
    },
    image: {
        height: "60%",
        width:"60%",
    },
    camera: {
        position: 'absolute',
        right: 0,
        bottom:0,
        backgroundColor: '#F50057',
        padding: 6,
        borderRadius: 100,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 20
    },
    row: {
        height: "10%",
        borderTopColor: '#C4C4C4',
        borderTopWidth: 1,
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