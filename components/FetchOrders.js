import React, {Component} from "react";
import {ActivityIndicator, FlatList, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API} from './../global'
import {Actions} from "react-native-router-flux";
import CustomListItem from "./CustomListItem";

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

        AsyncStorage.getItem('api_token').then((token) => {
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
                    renderItem={({item}) => (
                        <CustomListItem
                            title={"Bestelling #" + item.id.toString()}
                            subtitle={"Betaalmethode: " + item.payment_method.toString()}
                            hidden_text={"Betaald? " + item.paid.toString()}
                        />
                    )}
                />

            </View>
        );
    }
}
