import React, {Component} from "react";
import {Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {API, AuthHeaders, token} from "../../global";
import {Actions} from "react-native-router-flux";
import axios from 'axios';

export default class RemoveFromCartButton extends Component {
    constructor(props) {
        super(props);
    }

    removeOrderItemFromCart() {
        let URL = API.BASE_URL + "cart/remove";
        console.log("removeOrderItemFromCart token: " + token);

        if (token !== null) {
            axios.post(URL, {
                order_item_id: this.props.orderItemId
            },{
                headers: AuthHeaders(token)
            }).then((response) => {
                console.log(response);
                if (response.data.data.status === true) {
                    Alert.alert("orderItem", response.data.data.message);
                    this.props.onRefresh();
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
            <Icon onPress={this.removeOrderItemFromCart.bind(this)} name="trash-o" size={23} color="#000"/>
        )
    }
}