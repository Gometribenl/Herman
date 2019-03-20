import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import AppLayout from "../components/AppLayout";
import {Image, Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AppLayout>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={{uri: 'https://herman.wardpieters.nl/images/bg.png'}} >

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
                </ImageBackground>

            </AppLayout>
        );
    }
}