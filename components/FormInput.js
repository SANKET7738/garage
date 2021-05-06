import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

const FormInput = ({labelValue, placeholderText, ...rest}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    })

    return (
            <TextInput
                value={labelValue} 
                numberofLines={1}
                placeholder={placeholderText}
                style={styles.input}
                {...rest}
            />
    );
};

export default FormInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#E5E5E5',
        height: 50,
        width: 300,
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        fontSize: 18,
        fontFamily: 'Montserrat_400Regular',

    }
})