import React, {Component} from "react";
import {Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {API} from "../../global";
import AsyncStorage from "@react-native-community/async-storage";

export default class RemoveFromCartButton extends Component {
    constructor(props) {
        super(props);
    }

    removeOrderItemFromCart() {
        AsyncStorage.getItem('jwt').then((token) => {
            if (token !== null) {
                let URL = API.BASE_URL + "cart/remove";
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify({
                        order_item_id: this.props.orderItemId
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        if (responseData.data.status === true) {
                            Alert.alert("orderItem", responseData.data.message);
                            this.props.onRefresh();
                        } else {
                            Alert.alert("Fout", responseData.data.message);
                        }
                    })
                    .catch(error => {
                        Alert.alert("Error", error.message);
                    });
            }
        })
    }

    render() {
        return (
            <Icon onPress={this.removeOrderItemFromCart.bind(this)} name="trash-o" size={23} color="#000"/>
        )
    }
}