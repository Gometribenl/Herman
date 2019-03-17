import React from "react";
import RF from "react-native-responsive-fontsize";
import {Header} from "react-native-elements";
import {Alert, AsyncStorage, Platform, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from "../global";

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

export default class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static async userLogout() {
        try {
            await AsyncStorage.removeItem('jwt');
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
                    style: {color: '#fff', fontSize: RF(2.75)}
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