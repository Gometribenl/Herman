import React, {Component} from 'react';
import {Alert, AsyncStorage, StyleSheet, TextInput, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import {API, AppColors} from './../global';
import CustomHeader from "../components/CustomHeader";
import AppLayout from "../components/AppLayout";
import CustomStatusBar from "../components/CustomStatusBar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    buttonSection: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: 'center'
    },

    textSection: {},
});

class Authentication extends Component {

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

    render() {
        return (
            <AppLayout
                topColor={AppColors.AppColors.secondary.dark}
            >
                <CustomStatusBar
                    backgroundColor={AppColors.AppColors.secondary.dark}
                />

                <CustomHeader
                    backgroundColor={AppColors.AppColors.secondary.regular}
                    rightComponent={null}
                />

                <View style={styles.textSection}>
                    <TextInput
                        editable={true}
                        onChangeText={(email) => this.setState({email})}
                        placeholder='E-mailadres'
                        ref='email'
                        returnKeyType='next'
                        value={this.state.email}
                        autoComplete={'tel'}
                    />

                    <TextInput
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Wachtwoord'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                </View>

                <View style={styles.buttonSection}>
                    <Button
                        buttonStyle={styles.buttons}
                        title="Inloggen"
                        onPress={this.userLogin.bind(this)}
                    />

                    <Button
                        buttonStyle={styles.buttons}
                        title="Registreren"
                        onPress={this.userSignUp.bind(this)}
                    />
                </View>
            </AppLayout>
        );
    }
}

export default Authentication;