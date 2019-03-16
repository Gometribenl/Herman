import React, {Component} from 'react';
import AppLayout from "./Home";
import {StatusBar, View} from "react-native";
import {AppColors, Styles} from "../global";
import {Header, Text} from "react-native-elements";
import RF from "react-native-responsive-fontsize";
import CustomNavigation from "../components/CustomNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = Styles.styles;

export default class ProductList extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <StatusBar backgroundColor={AppColors.AppColors.primary.dark} barStyle="light-content"/>

                    <Header
                        centerComponent={{
                            text: 'Hermans Snackcorner',
                            style: {color: '#fff', fontSize: RF(2.75)}
                        }}
                        containerStyle={styles.headerContainer}
                        rightComponent={<Icon name="sign-out" size={30} onPress={this.userLogout}/>}
                    />

                    <Text>ProductList</Text>

                    <CustomNavigation
                        activeTab="products"
                    />

                </View>
            </AppLayout>
        );
    }
}