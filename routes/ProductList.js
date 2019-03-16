import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {API, AppColors} from "../global";
import {Header, Text} from "react-native-elements";
import RF from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomNavigation from "../components/CustomNavigation";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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

export default class ProductList extends Component {
    constructor() {
        super();
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

                    <Text>ProductList</Text>

                    <CustomNavigation
                        activeTab={"products"}
                    />

                </View>
            </AppLayout>
        );
    }
}