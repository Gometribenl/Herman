import React, {Component} from 'react';
import AppLayout from "../components/AppLayout";
import {StyleSheet, View, Alert} from "react-native";
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

    componentDidMount() {
        if (this.props.orderId) {
            console.log(this.orderIsPaid(this.props.orderId));
            Alert.alert("Bestelling #" + this.props.orderId, "Wanneer uw betaling verwerkt is ontvangt u een notificatie!");
        }
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