import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string()
        .required("Email Address is required")
        .email("Please enter valid email"),
    password: yup.string()
        .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
})

const LoginScreen = ({navigation}) => {
    const [loginData, setLoginData ] = useState([])

    const addLoginData = (data) => {
        setLoginData(data)
        console.log(data)
    } 
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{
                    uri: "https://i.imgur.com/Ccv4BDp.png"
                }}
            />
            <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                        validationSchema={loginSchema}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={(values, actions) => {
                            addLoginData(values);
                            actions.resetForm();
                        }}
                    >
                        {(formikProps) =>(
                            <View>
                                <FormInput
                                    labelValue={formikProps.values.email}
                                    onChangeText={formikProps.handleChange('email')}
                                    placeholderText={"Email"}
                                    placeholderTextColor="black"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onBlur={formikProps.handleBlur('email')}
                                />
                                {formikProps.touched.email && formikProps.errors.email ? (
                                    <Text style={styles.errorMsg}>{formikProps.errors.email}</Text>
                                ) : null}
                                <FormInput
                                    labelValue={formikProps.values.password}
                                    onChangeText={formikProps.handleChange('password')}
                                    placeholderText={"Password"}
                                    placeholderTextColor="black"
                                    secureTextEntry={true}
                                    onBlur={formikProps.handleBlur('password')}
                                />
                                {formikProps.touched.password && formikProps.errors.password ? (
                                    <Text style={styles.errorMsg}>{formikProps.errors.password}</Text>
                                ) : null}
                                <TouchableOpacity style={styles.ForgotPassword}>
                                    <Text>Forgot Password?</Text>
                                </TouchableOpacity>
                                <View style={styles.SignIn}>
                                    <FormButton 
                                        onPress={formikProps.handleSubmit}
                                        buttonTitle={"Sign In"} 
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
            <View style={styles.SignUp}>
                <Text style={{fontSize:16}}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                >
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
    SignUp: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    SignUpText: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F50057'
    },
    errorMsg: {
        marginLeft: 15,
        color: 'red',
    }
})