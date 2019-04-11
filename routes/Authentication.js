import React, {Component} from 'react';
import {Alert, ImageBackground, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Button, Text} from 'react-native-elements';
import {API, AppColors} from './../global';
import CustomHeader from "../components/CustomHeader";
import AppLayout from "../components/AppLayout";
import CustomStatusBar from "../components/CustomStatusBar";

export default class Authentication extends Component {
    constructor() {
        super();
        this.validateToken();
        this.state = {
            name: null,
            email: null,
            password: null
        };
    }

    static async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    validateToken() {
        let URL = API.BASE_URL + "validate";

        AsyncStorage.getItem('jwt').then((token) => {
            // If a token has been stored, verify it and login
            if (token !== null) {
                fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    },
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.data.status === true) Actions.home();
                        else Alert.alert("Error", response.data.message.toString());
                    })
                    .done();
            }
        })
    };

    userSignUp() {
        let URL = API.BASE_URL + "register";
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': API.USER_AGENT
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.data.status === true) {
                    Alert.alert("Success", "Your account has been created successfully, you can now login!");
                }
                else {
                    Alert.alert("Error", responseData.errors[0]);
                }
            })
            .done();
    }

    userLogin() {
        let URL = API.BASE_URL + "login";
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': API.USER_AGENT
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (!responseData.hasOwnProperty('message')) {
                    Authentication.saveItem("jwt", responseData.access_token);
                    Actions.home();
                } else {
                    let errors = [];

                    for (let k in responseData.errors) {
                        errors.push(responseData.errors[k][0])
                    }
                    Alert.alert("Error", errors[0]);
                }
            })
            .done();
    }

    render() {
        return (
            <AppLayout topColor={AppColors.AppColors.secondary.dark}>
                <ImageBackground style={{width: '100%', height: '100%'}}
                                 source={{uri: 'https://herman.wardpieters.nl/images/bg.png'}}>
                    <CustomStatusBar backgroundColor={AppColors.AppColors.secondary.dark}/>

                    <CustomHeader
                        backgroundColor={AppColors.AppColors.secondary.regular}
                        rightComponent={null}
                    />

                    <View style={styles.container}>
                        <Text style={[styles.userInfo]}>Naam</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(name) => this.setState({name: name})}
                                   ref="name"
                                   returnKeyType="next"
                                   value={this.state.name}
                                   autoComplete="name"
                        />
                        <Text style={[styles.userInfo]}>E-mailadres</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(email) => this.setState({email: email})}
                                   ref="email"
                                   returnKeyType="next"
                                   value={this.state.email}
                                   autoComplete="email"
                        />

                        <Text style={[styles.userInfo]}>Wachtwoord</Text>
                        <TextInput style={styles.input}
                                   editable={true}
                                   onChangeText={(password) => this.setState({password: password})}
                                   ref="password"
                                   returnKeyType='next'
                                   secureTextEntry={true}
                                   value={this.state.password}
                                   autoComplete="password"
                        />

                        <View style={styles.authSection}>
                            <Text style={[styles.loginSection]}
                                  onPress={(this.userLogin.bind(this))}>Inloggen</Text>
                            <Text style={[styles.registerSection]}
                                  onPress={(this.userSignUp.bind(this))}>Registeren</Text>

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

    // Buttons
    authSection: {
        color: "#000",
        justifyContent: "center",
        alignItems: "center"

    },

    loginSection: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 7,
    },

    registerSection: {
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