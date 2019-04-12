import React, {Component} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {API} from "../global";
import AsyncStorage from "@react-native-community/async-storage";

export default class ShoppingCartButton extends Component {
    constructor(props) {
        super(props);
    }

    addProductToCart() {
        AsyncStorage.getItem('jwt').then((token) => {
            // If a token has been stored, verify it and login
            if (token !== null) {
                let URL = API.BASE_URL + "cart/add";
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify({
                        product_id: this.props.productId
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        if (responseData.data.status === true) {

                        } else {

                        }
                    })
                    .done();
            }
        })
    }

    render() {
        return (
            <Icon onPress={this.addProductToCart.bind(this)} name="shopping-basket" size={25} color="#fff"/>
        )
    }
}