import React from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class FetchProducts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        return fetch('https://herman.wardpieters.nl/api/products')
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
                                    backgroundColor: 'white'
                                },
                                source: {
                                    uri: item.avatar_url
                                }
                            }}
                            title={item.name}
                            subtitle={item.price_formatted}
                            onPress={() => {
                                this.refs.toast.show(item.name, DURATION.LENGTH_SHORT);
                            }}
                        />
                    )}
                />
                <Toast ref="toast"/>
            </View>
        );
    }
}
