import React, {Component} from 'react';
import {Alert, ImageBackground, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Text} from 'react-native-elements';
import {API, AppColors} from './../global';
import CustomHeader from "../components/CustomHeader";
import AppLayout from "../components/AppLayout";
import CustomStatusBar from "../components/CustomStatusBar";
import Spinner from "react-native-loading-spinner-overlay";

export default class Authentication extends Component {
    constructor() {
        super();

        this.state = {
            name: null,
            email: null,
            password: null,
            spinner: true
        };
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    componentDidMount() {
        this.validateToken();
    }

    validateToken() {
        let URL = API.BASE_URL + "validate";

        AsyncStorage.getItem('jwt')
            .then((token) => {
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
                            this.setState({
                                spinner: false
                            });

                            setTimeout(function () {
                                if (response.status === true) Actions.home();
                                else Alert.alert("Error", response.message.toString());
                            }, 20);
                        })
                        .catch(error => {
                            Alert.alert("Error", error.message);
                        });
                } else this.setState({
                    spinner: false
                });
            })
    };

    userSignUp = () => {
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
                console.log(responseData);
                if (responseData.access_token) {
                    Alert.alert("Success", "Your account has been created successfully, you can now login!");
                    this.saveItem("jwt", responseData.access_token);
                    Actions.Home();
                } else {
                    let message= "";
                    for (var key in responseData.errors) {
                        for (var key1 in responseData.errors[key]) {
                            message += "\n" + responseData.errors[key][key1];
                        }
                    }
                    Alert.alert(responseData.message, message);
                }
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    };

    userLogin = () => {
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
            .then((response) => {
                console.log(response.status);
                if (response.status !== 200) {
                    Alert.alert("Error " + response.status,
                        "HTTP Error " + response.status + " occurred, please try again.");
                } else {
                    let responseData = response.json();
                    if (!responseData.message) {
                        this.saveItem("jwt", responseData.access_token);
                        Actions.home();
                    } else {
                        console.log(responseData.statusCode);
                        let message= "";
                        for (let key in responseData.errors) {
                            for (let key1 in responseData.errors[key]) {
                                message += "\n" + responseData.errors[key][key1];
                            }
                        }
                        Alert.alert(responseData.message, message);
                    }
                }
            })
            .catch(error => {
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
                            textContent={'Inloggen...'}
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
                            <Text style={[styles.loginSection]}
                                  onPress={(this.userLogin)}>Inloggen</Text>
                            <Text style={[styles.registerSection]}
                                  onPress={(this.userSignUp)}>Registeren</Text>

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