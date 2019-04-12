import React, {Component} from "react";
import {ActivityIndicator, FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API} from './../global';

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
                                <Icon onPress={() => console.log('hello')} name="shopping-basket" size={25} color="#fff"/>
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
