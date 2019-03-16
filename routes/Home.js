import React, {Component} from 'react';
import {Alert, AsyncStorage, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FetchProducts from '../components/FetchProducts';
import {AppColors, Styles} from "../global";
import AppLayout from "../components/AppLayout";
import {Header} from "react-native-elements";
import RF from "react-native-responsive-fontsize";
import CustomNavigation from "../components/CustomNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = Styles.styles;

export default class Home extends Component {
    constructor() {
        super();
    }

    async userLogout() {
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
            <AppLayout>
                <View style={styles.container}>
                    <StatusBar backgroundColor={AppColors.AppColors.primary.dark} barStyle="light-content"/>

                    <Header
                        centerComponent={{
                            text: 'Hermans Snackcorner',
                            style: {color: '#fff', fontSize: RF(2.75)}
                        }}
                        containerStyle={styles.headerContainer}
                        rightComponent={<Icon name="sign-out" size={30} onPress={this.userLogout}/>}
                    />

                    <FetchProducts/>

                    <CustomNavigation
                        activeTab="home"
                    />

                </View>
            </AppLayout>
        );
    }
}