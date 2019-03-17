import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import {Text} from "react-native-elements";
import CustomStatusBar from "../components/CustomStatusBar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default class ShoppingCart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <CustomStatusBar/>

                    <CustomHeader
                        headerTitle={"Winkelmand"}
                    />

                    <Text>Winkelmand</Text>

                </View>

                <CustomNavigation
                    activeTab={"cart"}
                />

            </AppLayout>
        );
    }
}