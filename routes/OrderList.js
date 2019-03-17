import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import FetchOrders from "../components/FetchOrders";
import CustomStatusBar from "./ShoppingCart";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default class OrderList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <CustomStatusBar/>

                    <CustomHeader
                        headerTitle={"Bestellingen"}
                    />

                    <FetchOrders/>

                </View>

                <CustomNavigation
                    activeTab={"orders"}
                />

            </AppLayout>
        );
    }
}