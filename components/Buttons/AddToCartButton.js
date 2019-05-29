import React, {Component} from "react";
import {Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {API, AuthHeaders, token} from "../../global";
import AsyncStorage from "@react-native-community/async-storage";
import {Actions} from "react-native-router-flux";
import axios from 'axios';

export default class AddToCartButton extends Component {
    constructor(props) {
        super(props);
    }

    addProductToCart() {
        let URL = API.BASE_URL + "cart/add";
        console.log("addProductToCart token: " + token);
        console.log("" + this.props.attributes);

        if (token !== null) {
            axios.post(URL, {
                product_id: this.props.productId
            }, {
                headers: AuthHeaders(token)
            }).then((response) => {
                console.log(response);
                if (response.data.data.status === true) {
                    Alert.alert("Product", response.data.data.message);
                } else {
                    Alert.alert("Fout", response.data.data.message);
                }
            })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert("Error", error.message);
                });
        } else {
            // Token is null so log user out
            Actions.auth();
        }
    }

    render() {
        return (
            <Icon onPress={this.addProductToCart.bind(this)} name="shopping-basket" size={25} color="#000"/>
        )
    }
}