import React, {Component} from "react";
import RF from "react-native-responsive-fontsize";
import {Header} from "react-native-elements";
import {Alert, Platform, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {API, AppColors, AuthHeaders, updateToken, deviceToken} from "../global";
import axios from "axios";

const styles = StyleSheet.create({
    headerContainer: {
        height: Platform.select({
            android: 56,
            default: 44,
        }),

        // Fix Header height in Android
        paddingTop: Platform.select({
            android: 0
        })
    },
});

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
    }

    static async userLogout() {
        try {
            axios.post(API.BASE_URL + "logout", {
                deviceToken: deviceToken
            }, {
                headers: AuthHeaders
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error.toString());
                });

            await AsyncStorage.removeItem('jwt');
            updateToken(undefined);

            Alert.alert("Success", "You have been successfully logged out!");
            Actions.auth();
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return (
            <Header
                centerComponent={{
                    text: this.props.headerTitle,
                    style: {color: '#000', fontSize: RF(2.50), fontWeight:'900'}
                }}
                containerStyle={[styles.headerContainer,
                    {
                        backgroundColor: this.props.backgroundColor
                    }
                ]}
                rightComponent={this.props.rightComponent}
            />
        )
    }
}

CustomHeader.defaultProps = {
    headerTitle: "Hermans Snackcorner",
    backgroundColor: AppColors.AppColors.primary.regular,
    rightComponent: <Icon name="sign-out" size={30} onPress={CustomHeader.userLogout}/>,
};