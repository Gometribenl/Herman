import React, {Component} from 'react';
import {Alert, AsyncStorage, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import {Header} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
import FetchProducts from '../components/FetchProducts';
import {AppColors} from "../global";
import AppLayout from "../components/AppLayout";
import CustomNavigation from "../components/CustomNavigation";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-end',
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

        backgroundColor: AppColors.AppColors.primary.regular,
    },
});


class Home extends Component {

    state = {
        deviceId: ''
    };

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
                <View style={{flex: 1, backgroundColor: 'white'}}>
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

                        <CustomNavigation/>

                    </View>

                </View>
            </AppLayout>
        );
    }
}

export default Home;