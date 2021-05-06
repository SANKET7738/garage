import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

const OnboardingScreen = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    })

    return (
        <Onboarding
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.replace("Login")}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image style={styles.image} source={{ uri: "https://i.imgur.com/NpNyk4H.png" }} />,
                title: 'Garage',
                subtitle: undefined,
                titleStyles: {
                    fontSize: 64,
                    fontWeight:'bold',
                    fontFamily: 'Montserrat_700Bold',
                }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.image} source={{ uri: "https://i.imgur.com/8X7R9PY.png"}} />,
                    title: 'Select vehicle type',
                    titleStyles: {
                        fontSize: 22,
                        fontWeight:'bold',
                        fontFamily: 'Montserrat_700Bold',
                    },
                    subtitle: 'Choose the type of your vehicle and size, we shortlist the appropriate parking spots for you!',
                    subtitleStyles: {
                        color: '#6F6D6D',
                        fontSize: 16,
                    }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.image} source={{ uri: "https://i.imgur.com/nJ9Dbdx.png"}} />,
                    title: 'Explore nearby parking spaces',
                    titleStyles: {
                        fontSize: 22,
                        fontWeight:'bold',
                        fontFamily: 'Montserrat_700Bold',
                    },
                    subtitle: 'Explore nearby parking spaces for your car type and choose the one available for your date and time.',
                    subtitleStyles: {
                        color: '#6F6D6D',
                        fontSize: '16',
                    }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.image} source={{ uri: "https://i.imgur.com/0FEq3IZ.png"}} />,
                    title: 'Pay Easily Online !',
                    titleStyles: {
                        fontSize: 22,
                        fontWeight:'bold',
                        fontFamily: 'Montserrat_700Bold',
                    },
                    subtitle: 'Make easy and secure online payments to instantly book your parking spots!',
                    subtitleStyles: {
                        color: '#6F6D6D',
                        fontSize: '16',
                    }
                },
            ]}
        />

    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 350,
        width: 350,
        resizeMode: 'contain',
    }
});