import React, {Component} from "react";
import {FlatList, View} from 'react-native';
import {ListItem, Text} from "react-native-elements";

export default class OrderProductsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.items}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) => (
                        <ListItem
                            leftAvatar={{
                                overlayContainerStyle: {
                                    backgroundColor: 'transparent'
                                },
                                rounded: false,
                                size: "medium",
                                imageProps: {
                                    resizeMode: "contain"
                                },
                                source: {
                                    uri: item.product.avatar_url
                                }
                            }}
                            title={item.product.name}
                            subtitle={item.price_formatted}
                            containerStyle={{
                                backgroundColor: "#f5f5f5",
                                paddingTop: 10,
                                paddingBottom: 10
                            }}
                        />
                    )}
                />

                <Text style={{marginLeft: 10, marginBottom: 5}}>Totaalbedrag: {this.props.totalPrice}</Text>
            </View>
        )
    }
}
