import React from 'react';
import {ActivityIndicator, AsyncStorage, FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast'
import {API} from './../global'
import {Actions} from "react-native-router-flux";

export default class FetchOrders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.fetchOrders();
    }

    fetchOrders() {
        let url = API.BASE_URL + "order/list";

        AsyncStorage.getItem('jwt').then((token) => {
            // If a token has been stored, verify it and login
            if (token !== null) {
                fetch(url, {
                    headers: {
                        'X-API-KEY': API.API_KEY,
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
                        <ListItem
                            leftAvatar={{
                                rounded: false,
                                size: "large",
                                imageProps: {
                                    resizeMode: "contain",
                                    backgroundColor: 'white'
                                },
                                source: {
                                    uri: "http://localhost/img.png"
                                }
                            }}
                            title={"Bestelling #" + item.id.toString()}
                            subtitle={"Betaald met: " + item.payment_method.toString()}
                            onPress={() => {
                                this.refs.toast.show(item.id.toString(), DURATION.LENGTH_SHORT);
                            }}
                        />
                    )}
                />
                <Toast ref="toast"/>
            </View>
        );
    }
}
