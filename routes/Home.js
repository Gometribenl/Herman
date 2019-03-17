import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLayout from "../components/AppLayout";
import {Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";

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
                    <CustomStatusBar/>

                    <CustomHeader
                        headerTitle={"Hermans Snackcorner"}
                    />

                    <Text>Welkom bij Hermans Snackcorner!</Text>

                </View>

                <CustomNavigation
                    activeTab={"home"}
                />

            </AppLayout>
        );
    }
}