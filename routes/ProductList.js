import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import FetchProducts from "../components/FetchProducts";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "./ShoppingCart";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default class ProductList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <CustomStatusBar/>

                    <CustomHeader
                        headerTitle={"Producten"}
                    />

                    <FetchProducts/>

                </View>

                <CustomNavigation
                    activeTab={"products"}
                />

            </AppLayout>
        );
    }
}