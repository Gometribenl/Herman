import React, {Component} from "react";
import {View} from 'react-native';
import {ListItem} from "react-native-elements";
import Display from 'react-native-display';
import RemoveFromCartButton from "./Buttons/RemoveFromCartButton";

export default class CartList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        }
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
                    onPress={() => {
                        this.setState({
                            hidden: !this.state.hidden
                        });
                    }}
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

                <Display enable={this.state.hidden}>
                    {this.props.children}
                </Display>

            </View>
        )
    }
}
