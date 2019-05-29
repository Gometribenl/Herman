import React, {Component} from "react";
import {ActivityIndicator, FlatList, Text, View, Alert, RefreshControl} from 'react-native';
import {API, AuthHeaders, token} from './../global';
import CartList from "./CartList";
import PayButton from "./Buttons/PayButton";
import axios from "axios";
import {Actions} from "react-native-router-flux";
import ProductAttributeList from "./ProductAttributeList";

export default class FetchCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            responseJson: null,
            dataSource: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.fetchCart();
    }

    fetchCart() {
        let URL = API.BASE_URL + "cart";
        console.log("fetchCart token: " + token);

        if (token !== null) {
            axios.get(URL, {
                headers: AuthHeaders(token)
            }).then((response) => {
                console.log(response);

                this.setState({
                    isLoading: false,
                    responseJson: response.data,
                    dataSource: response.data.order_items,
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

    handleCheckBoxClick = (id, value) => {
        console.log("handleCheckBoxClick", id, value);
    };

    renderItem = ({item}) => {
        return(
            <CartList
                title={item.product.name.toString()}
                subtitle={"Aantal : " + item.quantity.toString()}
                avatar_url={item.product.avatar_url.toString()}
                orderItemId={item.id}
                onRefresh={this.onRefresh.bind(this)}
            >
                <ProductAttributeList onClick={this.handleCheckBoxClick} attributes={item.attributes} defaultValue={true}/>
            </CartList>
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
                        renderItem={this.renderItem}
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
                        <Text style={{fontSize: 20, marginTop: 20}}>Totaal: {this.state.responseJson.total_price.formatted.toString()}</Text>
                        <PayButton/>
                    </View>
                </View>
            </View>
        );
    }
}
