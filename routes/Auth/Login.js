import React, {Component} from 'react';
import {Alert, ImageBackground, Linking, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Text} from 'react-native-elements';
import {API, AppColors, AuthHeaders, Headers, registerDevice, token, updateToken} from '../../global';
import CustomHeader from "../../components/CustomHeader";
import AppLayout from "../../components/AppLayout";
import CustomStatusBar from "../../components/CustomStatusBar";
import Spinner from "react-native-loading-spinner-overlay";
import axios from 'axios';

export default class Login extends Component {
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

    componentDidMount() {
        if (Actions.prevScene !== "register") this.validateToken();
    }

    validateToken() {
        let URL = API.BASE_URL + "validate";
        console.info("validateToken()");

        this.setState({spinner: true});

        AsyncStorage.getItem('jwt')
            .then((AsyncToken) => {
                updateToken(AsyncToken);
                // If a token has been stored, verify it and login
                if (token !== null) {
                    console.log("Token: " + token);

                    axios.get(URL, {
                        headers: AuthHeaders(token)
                    })
                        .then((response) => {
                            console.log(response);
                            this.setState({
                                spinner: false
                            });

                            if (response.data.status) {
                                Actions.home();
                            } else {
                                AsyncStorage.removeItem("jwt");
                                Alert.alert("Error", response.data.message.toString());
                            }
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
        Actions.register({AuthRef: "login"});
    };

    userLogin = () => {
        let URL = API.BASE_URL + "login";
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        this.setState({spinner: true});

        axios.post(URL, {
            email: this.state.email,
            password: this.state.password,
        }, {
            headers: Headers
        }).then((response) => {
            console.log(response);
            this.setState({spinner: false});
            if (response.data.access_token) {
                updateToken(response.data.access_token);
                this.saveItem("jwt", response.data.access_token);
                registerDevice();
                Actions.home();
            } else {
                let message = "";
                for (let key in response.data.errors) {
                    for (let key1 in response.data.errors[key]) {
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
                            textContent={'Inloggen...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"rgba(0, 0, 0, 0.5)"}
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
                                  onPress={(this.userSignUp)}>Nog geen account?</Text>

                        </View>

                        <Text style={{color: "blue", textAlign: 'center', paddingTop: 10}} onPress={() => {Linking.openURL("https://herman.wardpieters.nl/privacy-policy")}}>Door gebruik te maken van de app gaat U akkoord met het privacybeleid.</Text>

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