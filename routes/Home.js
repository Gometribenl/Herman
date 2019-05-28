import React, {Component} from 'react';
import {ImageBackground, Linking, StyleSheet, View} from 'react-native';
import AppLayout from "../components/AppLayout";
import {Image, Text} from "react-native-elements";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import {API, AppColors} from "../global";
import {Actions} from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    slider: {
        height: "30%",
        flex: 0,
        flexDirection: 'column',
    },

    logo: {
        width: 130,
        height: 130,
        left: "58%",
        top: "12%",
    },

    info: {
        marginLeft: "3%",
    }

});

export default class Home extends Component {
    constructor() {
        super();
    }

    openURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

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
            <AppLayout topColor={AppColors.AppColors.secondary.dark}>
                <ImageBackground style={{width: '100%', height: '100%'}}
                                 source={{uri: API.IMAGE_URL + 'bg.png'}}>

                    <View style={styles.container}>
                        <CustomStatusBar
                            backgroundColor={AppColors.AppColors.secondary.dark}/>

                        <CustomHeader
                            backgroundColor={AppColors.AppColors.secondary.regular}/>


                        <View style={{flex: 0, height: "25%"}}>
                            <Image
                                style={styles.logo}
                                source={{uri: API.IMAGE_URL + 'logo.png'}}/>
                        </View>

                        <View style={{flex: 0, height: "45%"}}>
                            <ImageSlider
                                images={[
                                    'http://placeimg.com/640/480/any',
                                    'http://placeimg.com/640/480/any',
                                    'http://placeimg.com/640/480/any'
                                ]}
                            />

                        </View>

                        <View style={{position: "absolute", bottom: 3}}>
                            <Icon style={styles.info} name="map-marker" size={20} color="#000">
                                <Text onPress={() => {this.openURL("https://goo.gl/maps/ER9L9aaw3k2EhBLu5")}}>   PEC Zwolle stadion</Text>
                            </Icon>
                            <Icon style={styles.info} name="phone" size={20} color="#000">
                                <Text onPress={() => {this.openURL("tel:31644217308")}}>  06 - 44 21 73 08</Text>
                            </Icon>
                            <Icon style={styles.info} name="envelope" size={20} color="#000">
                                <Text onPress={() => {this.openURL("mailto:info@hermanssnackcorner.nl")}}> info@hermanssnackcorner.nl</Text>
                            </Icon>
                        </View>


                    </View>

                    <CustomNavigation
                        activeTab={"home"}/>
                </ImageBackground>
            </AppLayout>
        );
    }
}