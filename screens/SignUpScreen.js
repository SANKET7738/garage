import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';

const SignUpScreen = ({navigation}) => {
    const [name, setName ] = useState();
    const [ phoneNo, setPhoneNo ] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    return (
        <View style={styles.container}>
            <View>
                <FormInput
                    labelValue={name}
                    onChangeText={(userName) => setName(userName)}
                    placeholderText={"Name"}
                    placeholderTextColor="black"
                />
                <FormInput
                    labelValue={phoneNo}
                    onChangeText={(userContact) => setPhoneNo(userContact)}
                    placeholderText={"Mobile Number"}
                    placeholderTextColor="black"
                    keyboardType="number-pad"
                />
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText={"Email"}
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormInput
                    labelValue={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    placeholderText={"Password"}
                    placeholderTextColor="black"
                    secureTextEntry={true}
                />
                <FormInput
                    labelValue={confirmPassword}
                    onChangeText={(userConfirmPassword) => setConfirmPassword(userConfirmPassword)}
                    placeholderText={"Confirm Password"}
                    placeholderTextColor="black"
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.SignIn}>
                <FormButton buttonTitle={"Sign Up"} />
                <SocialButton 
                    buttonTitle="Sign in with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => {}}
                />
            </View>
            <View style={styles.SignUp}>
                <Text style={{fontSize:16}}>Already Have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.SignUpText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpScreen;

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