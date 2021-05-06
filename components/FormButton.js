import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat"

const FormButton = ({buttonTitle, ...rest}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    })

    return (
        <TouchableOpacity style={styles.Button} {...rest}>
            <Text style={styles.Text}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    Button: {
        backgroundColor: '#F50057',
        height: 50,
        width: 300,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat_700Bold'
    }
})