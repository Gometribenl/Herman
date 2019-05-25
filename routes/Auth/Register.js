import React, {Component} from 'react';
import {Alert, ImageBackground, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Text} from 'react-native-elements';
import {API, AppColors, AuthHeaders, Headers, token, updateToken} from '../../global';
import CustomHeader from "../../components/CustomHeader";
import AppLayout from "../../components/AppLayout";
import CustomStatusBar from "../../components/CustomStatusBar";
import Spinner from "react-native-loading-spinner-overlay";
import axios from 'axios';

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: null,
            email: null,
            password: null,
            spinner: false
        };
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    userLogin = () => {
        Actions.auth();
    };

    userSignUp = () => {
        let URL = API.BASE_URL + "register";
        if (!this.state.name || !this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your name, email address and password to register!");
            return;
        }

        this.setState({spinner: true});

        axios.post(URL, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password
        }, {
            headers: Headers
        })
            .then((response) => {
                console.log(response);
                this.setState({spinner: false});
                if (response.data.access_token) {
                    updateToken(response.data.access_token);
                    this.saveItem("jwt", response.data.access_token);
                    Alert.alert("Success", "Your account has been created successfully, you can now login!");
                    Actions.home();
                } else {
                    let message = "";
                    for (var key in response.data.errors) {
                        for (var key1 in response.data.errors[key]) {
                            message += "\n" + response.data.errors[key][key1];
                        }
                    }
                    Alert.alert(response.data.message, message);
                }
            })
            .catch(error => {
                this.setState({spinner: false});
                Alert.alert("Error", error.message);
            });
    };

    render() {
        return (
            <AppLayout topColor={AppColors.AppColors.secondary.dark}>
                <ImageBackground style={{width: '100%', height: '100%'}}
                                 source={{uri: API.IMAGE_URL + 'bg.png'}}>
                    <CustomStatusBar backgroundColor={AppColors.AppColors.secondary.dark}/>

                    <CustomHeader
                        backgroundColor={AppColors.AppColors.secondary.regular}
                        rightComponent={null}
                    />

                    <View style={styles.container}>

                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Registreren...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"rgba(0, 0, 0, 0.5)"}
                        />

                        <Text style={[styles.userInfo]}>Naam</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(name) => this.setState({name: name})}
                                   ref="name"
                                   returnKeyType="next"
                                   value={this.state.name}
                                   textContentType="name"
                        />
                        <Text style={[styles.userInfo]}>E-mailadres</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(email) => this.setState({email: email})}
                                   ref="email"
                                   returnKeyType="next"
                                   value={this.state.email}
                                   textContentType="emailAddress"
                                   keyboardType="email-address"
                        />

                        <Text style={[styles.userInfo]}>Wachtwoord</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(password) => this.setState({password: password})}
                                   ref="password"
                                   returnKeyType='go'
                                   secureTextEntry={true}
                                   value={this.state.password}
                                   textContentType="password"
                        />

                        <View style={styles.authSection}>
                            <Text style={[styles.registerSection]}
                                  onPress={(this.userSignUp)}>Registeren</Text>
                            <Text style={[styles.loginSection]}
                                  onPress={(this.userLogin)}>Heeft u al een account?</Text>

                        </View>
                    </View>
                </ImageBackground>
            </AppLayout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    // Spinner
    spinnerTextStyle: {
        color: '#FFF'
    },

    // Buttons
    authSection: {
        color: "#000",
        justifyContent: "center",
        alignItems: "center"

    },

    registerSection: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 7,
    },

    loginSection: {
        fontSize: 20,
        fontWeight: '300',
    },


    //Signup/login section
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 200,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: '#000',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black'
    },

    userInfo: {
        fontSize: 30,
        fontWeight: '900',
        color: '#000'
    }
});