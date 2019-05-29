import React, {Component} from "react";
import {View} from 'react-native';
import {ListItem} from "react-native-elements";
import Display from 'react-native-display';
import 'moment/locale/nl'
import AddToCartButton from "./Buttons/AddToCartButton";
import ProductAttributeList from "./ProductAttributeList";

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
            attributesChecked: []
        };
    }

    handleCheckBoxClick = (id, value) => {
        console.log("handleCheckBoxClick", id, value);

        let tempCheckBoxChecked = this.state.attributesChecked;
        tempCheckBoxChecked[id] = value;

        this.setState({
            attributesChecked: tempCheckBoxChecked
        });
    };

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
                        <AddToCartButton productId={this.props.product.id} attributes={this.state.attributesChecked}/>
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
                    <ProductAttributeList onClick={this.handleCheckBoxClick} attributes={this.props.product.attributes} defaultValue={false}/>
                </Display>

            </View>
        )
    }
}
