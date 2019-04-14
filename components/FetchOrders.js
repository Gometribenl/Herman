import React, {Component} from "react";
import {ActivityIndicator, FlatList, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API} from './../global'
import {Actions} from "react-native-router-flux";
import OrderList from "./OrderList";
import {Text} from "react-native-elements";

export default class FetchOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.fetchOrders();
    }

    fetchOrders() {
        let url = API.BASE_URL + "orders";

        AsyncStorage.getItem('jwt').then((token) => {
            // If a token has been stored, verify it and login
            if (token !== null) {
                fetch(url, {
                    headers: {
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        this.setState({
                            isLoading: false,
                            dataSource: responseJson,
                        }, function () {

                        });

                    })
                    .catch((error) => {
                        console.error(error);
                    }).done();
            } else {
                // Token is null so log user out
                Actions.auth();
            }
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#c2c2c2",
                }}
            />
        );
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) => (
                        <OrderList
                            title={"Bestelling #" + item.id.toString()}
                            subtitle={"Betaalmethode: " + item.payment_method.toString()}
                        >
                            <Text>Betaald? {item.is_paid.toString()}</Text>
                        </OrderList>
                    )}
                />

            </View>
        );
    }
}
