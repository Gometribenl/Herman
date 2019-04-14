import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {ImageBackground, StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import FetchOrders from "../components/FetchOrders";
import CustomStatusBar from "../components/CustomStatusBar";
import {API, AppColors} from "../global";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class Orders extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: API.IMAGE_URL + 'bg.png'}}>

                    <View style={styles.container}>
                        <CustomStatusBar/>
                        <CustomHeader headerTitle={"Bestellingen"}/>
                        <FetchOrders/>
                    </View>

                    <CustomNavigation activeTab={"orders"}/>

                </ImageBackground>
            </AppLayout>
        );
    }
}