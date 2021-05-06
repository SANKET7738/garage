import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';

const LoginScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{
                    uri: "https://i.imgur.com/Ccv4BDp.png"
                }}
            />
            <View>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText={"Email"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    placeholderText={"Password"}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.ForgotPassword}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.SignIn}>
                <FormButton buttonTitle={"Sign In"} />
                <SocialButton 
                    buttonTitle="Sign in with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => {}}
                />
            </View>
            <View style={styles.SignUp}>
                <Text style={{fontSize:16}}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.SignUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    }, 
    SignIn: {
        margin: "8%",
    },
    image: {
        height: 250,
        width: 250,
        resizeMode: 'contain',
        margin: 0,
        padding: 0
    },
    ForgotPassword: {
        alignSelf: 'flex-end',
        margin: 10,
        fontSize: 16,
    },
    SignUp: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    SignUpText: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F50057'
    }
})