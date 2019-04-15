import React, {Component} from "react";
import {ActivityIndicator, FlatList, Text, View, Alert, RefreshControl} from 'react-native';
import {API} from './../global';
import AsyncStorage from "@react-native-community/async-storage";
import CartList from "./CartList";
import {Button} from "react-native-elements";

export default class FetchCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            responseJson: null,
            dataSource: null,
            refreshing: false,
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
                            responseJson: responseJson,
                            dataSource: responseJson.order_items,
                        }, function () {

                        });

                    })
                    .catch(error => {
                        Alert.alert("Error", error.message);
                    });
            }
        })
    }

    onRefresh() {
        this.setState({ dataSource: [] });
        this.fetchCart();
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
            <View style={{backgroundColor: "#f5f5f5"}}>
                <View style={{flex: 0, height: "80%"}}>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({item}) => (
                            <CartList
                                title={item.product.name.toString()}
                                subtitle={"Aantal : " + item.quantity.toString()}
                                avatar_url={item.product.avatar_url.toString()}
                                orderItemId={item.id}
                                onRefresh={this.onRefresh.bind(this)}
                            >
                                <Text>Attributes: {item.attributes.toString()}</Text>
                            </CartList>
                        )}
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </View>
                <View style={{flex: 0, height: "20%", backgroundColor: "white"}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={{fontSize: 20, marginTop: 20}}>Totaal: {this.state.responseJson.total_price_formatted.toString()}</Text>
                        <Button style={{marginTop: 15}} title={"Betalen"}/>
                    </View>
                </View>
            </View>
        );
    }
}
