import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CameraModule from '../components/CameraModule';
import { useDispatch, useSelector } from 'react-redux';
import { parkingSpaceUpdateImages } from '../redux/actions';
import axios from 'axios';
import { BottomNavigation } from 'react-native-paper';

function ParkingSpaceAddPhotos({navigation}) {
    const user = useSelector(state => state.userState.currentUser)
    const addressState = useSelector(state => state.addressState)
    const [image, setImage] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [camera, setShowCamera] = useState(false);
    const [, updateState ] = React.useState();
    const [ loading, setLoading ] = useState(false);
    const refreshPage = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log(imageArray);
        console.log(imageURLs)
    },[image])

    const uploadImage =  (image_uri) => {
        let url ='http://10.0.2.2:5000/uploadImage';
        let uploadData = new FormData();
        uploadData.append('submit','ok');
        uploadData.append('file', { type: 'image/jpg', uri: image_uri, name: image_uri.replace(/^.*[\\\/]/, '')})
        fetch(url, {
            method: 'post',
            body: uploadData
        }).then(response => response.json())
          .then(response => {
              console.log(response.public_url)
              let image_url = response.public_url
              imageURLs.push(response.public_url)
              setImageURLs(imageURLs)
              setLoading(false)
          })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setLoading(true)
            setImage(result.uri)
            imageArray.push(result.uri)
            uploadImage(result.uri)
            setImageArray(imageArray)
            refreshPage()
        }
    }

    if (loading) {
        return (
            <View style={styles.container}> 
                <ActivityIndicator size="large" color="#F50057"/>
            </View>
        )
    }

    return (
       <View style={styles.container}>
           <View style={{justifyContent:"center", alignItems:"center"}}>
               <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        setShowCamera(true);
                    }}
                >
                   <Text style={styles.buttonText}>Open Camera</Text>
               </TouchableOpacity>
               { camera && (
                   <CameraModule
                        showModal={camera}
                        setModalVisible={() => setShowCamera(false)}
                        setImage={(result) => {
                            setImage(result.uri)
                            uploadImage(result.uri)
                            imageArray.push(result.uri)
                            setImageArray(imageArray)
                        }}
                   />
               )}
               <TouchableOpacity style={styles.button} onPress={pickImage}>
                   <Text style={styles.buttonText}>Pick a Image</Text>
               </TouchableOpacity>
           </View>
           <ScrollView style={styles.imageArea} horizontal={true}>
                {imageArray && imageArray.map((image, i) => (
                    <Image key={i} source={{uri: image}} style={{width: 300, height: 300, margin:20, marginVertical: 40}} />
                ))}
           </ScrollView>
           <View style={{ alignItems: "center", marginTop: 10}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        addressState["images"] = imageURLs
                        addressState["uid"] = user.uid
                        console.log(addressState)
                        if(!addressState['completeAddress']){
                            addressState['completeAddress'] = addressState['addressText']
                        }
                        axios.post(
                            'http://10.0.2.2:5000/addParkingSpace',
                            addressState
                        )
                        .then((response) => {
                            console.log(response.data)
                            navigation.navigate("Parking Spaces")
                        })
                        .catch((error) => console.log(error))
                    }}
                >
                   <Text style={styles.buttonText}>Submit</Text>
               </TouchableOpacity>
           </View>
       </View>
    )
}

export default ParkingSpaceAddPhotos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }, 
    button :{
        margin: 10,
        paddingVertical: 15,
        width: 180,
        backgroundColor: "#F50057",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText :{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    imageArea: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.4, 
        overflow: "scroll",
        flexDirection: "row"
    },
    buttonBottom: {
       

    }
})
