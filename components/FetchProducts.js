import React, {Component} from "react";
import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {API, Headers, token} from './../global';
import AddToCartButton from "./Buttons/AddToCartButton";
import axios from "axios";
import ProductList from "./ProductList";
import ProductAttributeList from "./ProductAttributeList";

export default class FetchProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        let URL = API.BASE_URL + "products";

        axios.get(URL, {
            headers: Headers
        }).then((response) => {
            console.log(response);

            this.setState({
                isLoading: false,
                dataSource: response.data,
            });

        })
            .catch(error => {
                console.log(error.response);
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

    renderItem = ({item}) => {
        return(
            <ProductList product={item}>
                <ProductAttributeList attributes={item.attributes}/>
            </ProductList>
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
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}
