import React, {Component} from 'react';
import {Alert, Text, TextInput, View, AsyncStorage, StyleSheet, Platform, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Header} from 'react-native-elements';
import RF from "react-native-responsive-fontsize"
import {AppColors} from './../global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    buttons: {},

    buttonSection: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: 'center'
    },

    textSection: {},

    headerContainer: {
        height: Platform.select({
            android: 56,
            default: 44,
        }),

        // Fix Header height in Android
        paddingTop: Platform.select({
            android: 0
        }),

        backgroundColor: AppColors.AppColors.secondary.regular,
    },
});

class Authentication extends Component {

    constructor() {
        super();

        this.state = {
            email: null,
            password: null
        };
    }

    async saveItem(item, selectedValue) {
        try {
            console.warn(selectedValue);
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    userSignUp() {
        if (!this.state.email || !this.state.password) {
            Alert.alert("Information required", "You are required to fill in your emailaddress and password to register!");
            return;
        }

        fetch('http://10.0.2.2:3001/users', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => {
                if (response._bodyText === "A user with that username already exists") {
                    Alert.alert("Failed", "A user with that username already exists!");
                } else {
                    this.saveItem('id_token', response.id_token);
                    Alert.alert("Success", "Your account has been successfully created!");
                    Actions.Home();
                }
            })
            .done();
    }

    static userLogin() {
        Actions.Home();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={AppColors.AppColors.secondary.dark} barStyle="light-content"/>

                <Header
                    centerComponent={{text: 'Hermans Snackcorner', style: {color: '#303030', fontSize: RF(3.25)}}}
                    containerStyle={styles.headerContainer}
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
                        onPress={Authentication.userLogin.bind(this)}
                    />

                    <Button
                        buttonStyle={styles.buttons}
                        title="Registreren"
                        onPress={this.userSignUp.bind(this)}
                    />
                </View>

            </View>
        );
    }
}

export default Authentication;