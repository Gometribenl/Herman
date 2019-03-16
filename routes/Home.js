import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppColors} from "../global";
import AppLayout from "../components/AppLayout";
import {Header, Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

});

export default class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <StatusBar backgroundColor={AppColors.AppColors.primary.dark} barStyle="light-content"/>

                    <CustomHeader/>

                    <Text
                        style={{
                            height: 500
                        }}
                    >
                        Welkom bij Hermans Snackcorner!
                    </Text>

                    <CustomNavigation
                        activeTab={"home"}
                    />

                </View>
            </AppLayout>
        );
    }
}