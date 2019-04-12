import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import AppLayout from "../components/AppLayout";
import {Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import {API, AppColors} from "../global";

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
            <AppLayout
                topColor={AppColors.AppColors.secondary.dark}>
                <ImageBackground style={{width: '100%', height: '100%'}}
                                 source={{uri: API.IMAGE_URL + 'bg.png'}}>

                    <View style={styles.container}>
                        <CustomStatusBar
                            backgroundColor={AppColors.AppColors.secondary.dark}/>

                        <CustomHeader
                            backgroundColor={AppColors.AppColors.secondary.regular}/>

                        <Text>Welkom bij Hermans Snackcorner!</Text>

                    </View>
                    <CustomNavigation
                        activeTab={"home"}/>
                </ImageBackground>
            </AppLayout>
        );
    }
}