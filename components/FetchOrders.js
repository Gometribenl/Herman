import React, {Component} from "react";
import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import {API, AuthHeaders, token} from './../global'
import {Actions} from "react-native-router-flux";
import OrderList from "./OrderList";
import OrderProductsList from "./OrderProductsList";
import axios from 'axios';

export default class FetchOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders() {
        let URL = API.BASE_URL + "orders";
        console.log("fetchOrders token: " + token);

        if (token !== null) {
            axios.get(URL, {
                headers: AuthHeaders(token)
            }).then((response) => {
                console.log(response);

                this.setState({
                    isLoading: false,
                    dataSource: response.data,
                });

            })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert("Error", error.message);
                });
        } else {
            // Token is null so log user out
            Actions.auth();
        }
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
                        <OrderList order={item}>
                            <OrderProductsList totalPrice={item.total_price.formatted} items={item.order_items}/>
                        </OrderList>
                    )}
                />

            </View>
        );
    }
}
