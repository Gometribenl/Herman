import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {ImageBackground, StyleSheet, View} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import FetchProducts from "../components/FetchProducts";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import {API, AppColors} from "../global";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class Products extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                    <View style={styles.container}>
                        <CustomStatusBar
                            backgroundColor={AppColors.AppColors.secondary.dark}
                        />

                        <CustomHeader
                            backgroundColor={AppColors.AppColors.secondary.regular}
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