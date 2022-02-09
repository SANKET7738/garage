import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';

const CameraModule = (props) => {
    const [cameraRef, setCameraRef ] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async() => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    },[]);

    if(hasPermission === null){
        return <View/>;
    } else if (hasPermission === false ){
        return <Text>No access to camera</Text>;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                props.setModalVisible();
            }}

        >
            <Camera
                style={{
                    flex:1,
                    bottom: 0,
                }}
                ratio='16:9'
                // flashMode={Camera.Constants.FlashMode.on}
                type={type}
                ref={(ref) => {
                    setCameraRef(ref);
                }}
            >
                <View
                    style={{
                        backgroundColor: "black",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <Button
                        icon="close"
                        style={{marginLeft:12}}
                        mode="outlined"
                        color="white"
                        title="Close"
                        onPress={() => {
                            props.setModalVisible();
                        }}
                    >
                        Close
                    </Button>
                    <TouchableOpacity
                        onPress={async() => {
                            if(cameraRef) {
                                let photo = await cameraRef.takePictureAsync();
                                props.setImage(photo);
                                props.setModalVisible();
                            }
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 2,
                                borderRadius: 50,
                                borderColor: "white",
                                height: 50,
                                width: 50,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 16,
                                marginTop: 16,
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    borderColor: "white",
                                    height: 40,
                                    width: 40,
                                    backgroundColor: "white",
                                }}
                            ></View>
                        </View>
                    </TouchableOpacity>
                    <Button
                        title="Front"
                        icon="axis-z-rotate-clockwise"
                        style={{ marginRight: 12 }}
                        mode="outlined"
                        color="white"
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                            );
                        }} 
                    >
                        {type === Camera.Constants.Type.back ? "Front" : "Back"}
                    </Button>
                </View>
            </Camera>
        </Modal>
    );
};

export default CameraModule;
