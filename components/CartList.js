import React, {Component} from "react";
import {View} from 'react-native';
import {ListItem} from "react-native-elements";
import RemoveFromCartButton from "./Buttons/RemoveFromCartButton";

export default class CartList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ListItem
                    rightAvatar={
                        <RemoveFromCartButton onRefresh={this.props.onRefresh} orderItemId={this.props.orderItemId}/>
                    }
                    title={this.props.title}
                    subtitle={this.props.subtitle}
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
                            uri: this.props.avatar_url
                        }
                    }}
                    containerStyle={{
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                />

                {this.props.children}

            </View>
        )
    }
}
