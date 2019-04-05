import React, {Component} from 'react';
import {Alert, AsyncStorage, ImageBackground, StyleSheet, TextInput, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Text} from 'react-native-elements';
import {API, AppColors} from './../global';
import CustomHeader from "../components/CustomHeader";
import AppLayout from "../components/AppLayout";
import CustomStatusBar from "../components/CustomStatusBar";

// /*<============================================Functionality===========================================>*/

export default class Authentication extends Component {

    constructor() {
        super();

        this.validateToken();

        this.state = {
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
        let URL = API.BASE_URL + "user/validate";

        AsyncStorage.getItem('jwt').then((token) => {
            // If a token has been stored, verify it and login
            if (token !== null) {
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-KEY': API.API_KEY,
                        'User-Agent': API.USER_AGENT
                    },
                    body: JSON.stringify({'jwt': token})
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.success === true) {
                            // Go to Home
                            Actions.home();
                        } else {
                            Alert.alert("Error", response.message.toString());
                        }
                    })
                    .done();
            }
        })
    };

    userSignUp() {
        let URL = API.BASE_URL + "user/register";
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-KEY': API.API_KEY,
                'User-Agent': API.USER_AGENT
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.success === true) {
                    Alert.alert("Success", "Your account has been created successfully, you can now login!");

                } else {
                    Alert.alert("Error", responseData.message);
                }

            })
            .done();
    }

    userLogin() {
        let URL = API.BASE_URL + "user/login";
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-KEY': API.API_KEY,
                'User-Agent': API.USER_AGENT
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {

                if (responseData.success === true) {
                    Authentication.saveItem("jwt", responseData.jwt);
                    Actions.home();
                } else {
                    Alert.alert("Error", responseData.message);
                }

            })
            .done();
    }

// /*<============================================show===========================================>*/

    render() {
        return (
            <AppLayout
                topColor={AppColors.AppColors.secondary.dark}
            >
                <ImageBackground style={{width: '100%', height: '100%'}}
                                 source={{uri: 'https://herman.wardpieters.nl/images/bg.png'}}>

                    <CustomStatusBar
                        backgroundColor={AppColors.AppColors.secondary.dark}
                    />

                    <CustomHeader
                        backgroundColor={AppColors.AppColors.secondary.regular}
                        rightComponent={null}
                    />


                    <View style={styles.container}>
                        <Text style={[styles.userInfo]}>E-mailadres</Text>
                        <View>
                            <TextInput style={styles.input}
                                       editable={true}
                                       onChangeText={(email) => this.setState({email})}
                                       ref='email'
                                       returnKeyType='next'
                                       value={this.state.email}
                                       autoComplete={'tel'}

                            />
                        </View>

                        <Text style={[styles.userInfo]}>Wachtwoord</Text>
                        <View>

                            <TextInput style={styles.input}
                                       editable={true}
                                       onChangeText={(password) => this.setState({password})}
                                       ref='password'
                                       returnKeyType='next'
                                       secureTextEntry={true}
                                       value={this.state.password}
                            />

                        </View>
                        <View style={styles.authSection}>
                            <Text style={[styles.loginSection]}
                                  onPress={(this.userLogin.bind(this))}> Inloggen </Text>
                            <Text style={[styles.regSection]}
                                onPress={(this.userSignUp.bind(this))}> Registeren </Text>

                        </View>
                    </View>
                </ImageBackground>
            </AppLayout>
        );
    }


}

// /*<=============================================STYLE=============================================>*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

// /*<============================================ButtonSection===========================================>*/

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

    regSection: {
        fontSize: 20,
        fontWeight: '300',
    },

// /*<============================================signup/inSection===========================================>*/


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