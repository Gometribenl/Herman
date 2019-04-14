import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import FetchCart from "../components/FetchCart";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class ShoppingCart extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <CustomStatusBar/>

                    <CustomHeader
                        headerTitle={"Winkelmand"}/>

                    <FetchCart/>

                </View>
                <CustomNavigation
                    activeTab={"cart"}/>
            </AppLayout>
        );
    }
}