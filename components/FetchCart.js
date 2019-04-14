import React, {Component} from "react";
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {API} from './../global';
import AsyncStorage from "@react-native-community/async-storage";
import CartList from "./CartList";

export default class FetchCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.fetchCart();
    }

    fetchCart() {
        AsyncStorage.getItem('jwt').then((token) => {
            if (token !== null) {
                let URL = API.BASE_URL + "cart";

                fetch(URL, {method: 'GET', headers: {'User-Agent': API.USER_AGENT, 'Authorization': "Bearer " + token}})
                    .then((response) => response.json())
                    .then((responseJson) => {

                        this.setState({
                            isLoading: false,
                            dataSource: responseJson.order_items,
                        }, function () {

                        });

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        })
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
                        <CartList
                            title={item.product.name.toString()}
                            subtitle={"Aantal : " + item.quantity.toString()}
                            avatar_url={item.product.avatar_url.toString()}
                        >
                            <Text>Attributes: {item.attributes.toString()}</Text>
                        </CartList>
                    )}
                />
            </View>
        );
    }
}
