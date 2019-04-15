import React, {Component} from "react";
import {ActivityIndicator, FlatList, View, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {API} from './../global';
import AddToCartButton from "./Buttons/AddToCartButton";

export default class FetchProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.fetchProducts();
    }

    fetchProducts() {
        let url = API.BASE_URL + "products";

        return fetch(url, {headers: {'User-Agent': API.USER_AGENT}})
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch(error => {
                Alert.alert("Error", error.message);
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
                        <ListItem
                            leftAvatar={{
                                overlayContainerStyle: {
                                    backgroundColor: 'transparent'
                                },
                                rounded: false,
                                size: "large",
                                imageProps: {
                                    resizeMode: "contain"
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
                                backgroundColor: "#f5f5f5",
                                paddingTop: 5,
                                paddingBottom: 5
                            }}
                        />
                    )}
                />
            </View>
        );
    }
}
