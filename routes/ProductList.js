import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {API, AppColors} from "../global";
import CustomNavigation from "../components/CustomNavigation";
import FetchProducts from "../components/FetchProducts";
import CustomHeader from "../components/CustomHeader";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }

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

                    <CustomHeader/>

                    <FetchProducts/>

                    <CustomNavigation
                        activeTab={"products"}
                    />

                </View>
            </AppLayout>
        );
    }
}