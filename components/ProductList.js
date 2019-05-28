import React, {Component} from "react";
import {View} from 'react-native';
import {ListItem} from "react-native-elements";
import Display from 'react-native-display';
import 'moment/locale/nl'
import AddToCartButton from "./Buttons/AddToCartButton";

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
        };
    }

    render() {
        return (
            <View>
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
                            uri: this.props.product.avatar_url
                        }
                    }}
                    rightAvatar={
                        <AddToCartButton productId={this.props.product.id}/>
                    }
                    title={this.props.product.name}
                    subtitle={this.props.product.price_formatted}
                    onPress={() => {
                        this.setState({
                            hidden: !this.state.hidden
                        });
                    }}
                    containerStyle={{
                        backgroundColor: "#f5f5f5",
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                />

                <Display enable={this.state.hidden} style={{backgroundColor: "#f5f5f5"}}>
                    {this.props.children}
                </Display>

            </View>
        )
    }
}
