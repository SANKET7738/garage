import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { Formik } from 'formik';

const SignUpScreen = ({navigation}) => {
    const [ userData, setUserData ] = useState([])

    const addUserData = (userData) => {
        setUserData(userData)
        console.log(userData)
    }

    if(userData.name) {
        console.log('1')
        console.log(userData.name);
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                    <Formik
                        initialValues={{ 
                            name: '', 
                            phoneNo: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
            
                        }}
                        onSubmit={(values, actions) => {
                            addUserData(values);
                            actions.resetForm();
                        }}
                    >
                        {(formikProps) => (
                            <View>
                                <FormInput
                                    labelValue={formikProps.values.name}
                                    onChangeText={formikProps.handleChange('name')}
                                    placeholderText={"Name"}
                                    placeholderTextColor="black"
                                />
                                <FormInput
                                    labelValue={formikProps.values.phoneNo}
                                    onChangeText={formikProps.handleChange('phoneNo')}
                                    placeholderText={"Mobile Number"}
                                    placeholderTextColor="black"
                                    keyboardType="number-pad"
                                />
                                <FormInput
                                    labelValue={formikProps.values.email}
                                    onChangeText={formikProps.handleChange('email')}
                                    placeholderText={"Email"}
                                    placeholderTextColor="black"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <FormInput
                                    labelValue={formikProps.values.password}
                                    onChangeText={formikProps.handleChange('password')}
                                    placeholderText={"Password"}
                                    placeholderTextColor="black"
                                    secureTextEntry={true}
                                />
                                <FormInput
                                    labelValue={formikProps.values.confirmPassword}
                                    onChangeText={formikProps.handleChange('confirmPassword')}
                                    placeholderText={"Confirm Password"}
                                    placeholderTextColor="black"
                                    secureTextEntry={true}
                                />
                                <View style={styles.SignUp}>
                                    <FormButton
                                        onPress={formikProps.handleSubmit}
                                        buttonTitle={"Sign Up"} 
                                    />
                                    <SocialButton 
                                        buttonTitle="Sign in with Google"
                                        btnType="google"
                                        color="#de4d41"
                                        backgroundColor="#f5e7ea"
                                        onPress={() => {}}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.SignIn}>
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
    SignUp: {
        marginVertical: "8%",
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
    SignIn: {
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