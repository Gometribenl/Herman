import React, {Component} from 'react';
import {ImageBackground, Linking, StyleSheet, View} from 'react-native';
import AppLayout from "../components/AppLayout";
import {Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import {API, AppColors} from "../global";
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default class Home extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                // User launched app via deep linking
                console.log('Initial url is: ' + url);
                let regexpOrderId = /(?:https:\/\/herman.wardpieters.nl\/callback\/)(.*)(?:\?)/g;
                let matches = regexpOrderId.exec(url);

                if (matches != null && matches.length > 0) {
                    console.log(matches);
                    Actions.cart({orderId: matches[1]});
                }
            }
        }).catch(err => console.error('An error occurred', err));
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