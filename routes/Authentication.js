import React, {Component} from 'react';
import {Text, TextInput, View, AsyncStorage, StyleSheet, Platform, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Header} from 'react-native-elements';
import RF from "react-native-responsive-fontsize"
import { AppColors } from './../global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    buttons: {
    },

    buttonSection: {
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: 'center'
    },

    textSection: {

    },

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

    static userSignUp() {
        Actions.Home();
    }

    static userLogin() {
        Actions.Home();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={AppColors.AppColors.secondary.dark} barStyle="light-content"/>

                <Header
                    centerComponent={{text: 'Hermans Snackcorner', style: {color: '#fff', fontSize: RF(3.25)}}}
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
                        onPress={Authentication.userSignUp.bind(this)}
                    />
                </View>

            </View>
        );
    }
}

export default Authentication;