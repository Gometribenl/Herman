import React, {Component} from "react";
import {ActivityIndicator, FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {API} from './../global';
import AddToCartButton from "./AddToCartButton";

export default class FetchCart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.fetchCart();
    }

    fetchCart() {
        let url = API.BASE_URL + "cart";

        return fetch(url, {headers: {'User-Agent': API.USER_AGENT}})
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
                        <ListItem
                            leftAvatar={{
                                rounded: false,
                                size: "large",
                                imageProps: {
                                    resizeMode: "contain",
                                    backgroundColor: "transparent"

                                },
                                source: {
                                    uri: item.avatar_url
                                }
                            }}
                            rightAvatar={
                                <AddToCartButton productId={item.id}/>
                            }
                            title={item.name}
                            subtitle={item.price_formatted}
                            containerStyle={{
                                backgroundColor: "rgba(255, 200, 200, 0)"
                            }}
                        />
                    )}
                />
            </View>
        );
    }
}
