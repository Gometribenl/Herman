import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View, Alert} from "react-native";
import CustomNavigation from "../components/CustomNavigation";
import CustomHeader from "../components/CustomHeader";
import CustomStatusBar from "../components/CustomStatusBar";
import FetchCart from "../components/FetchCart";
import {API} from "../global";
import {Actions} from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class ShoppingCart extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.orderId) {
            // TODO: Check payment status
            console.log(this.orderIsPaid(this.props.orderId));
            if (this.orderIsPaid(this.props.orderId)) {
                Alert.alert("Betaling", "U heeft een betaling gedaan voor bestelling #" + this.props.orderId);
            } else {
                Alert.alert("Betaling", "De betaling voor bestelling #" + this.props.orderId + " is mislukt of wordt nog verwerkt");
            }
        }
    }

    orderIsPaid(orderId) {
        let isPaid = false;

        AsyncStorage.getItem('jwt')
            .then((token) => {
                fetch(API.BASE_URL + "orders/" + orderId, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    },
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.is_paid) isPaid = true;
                    })
                    .catch(error => {
                        Alert.alert("Error", error.message);
                    });
            })
            .done(() => {
                return isPaid;
            });
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