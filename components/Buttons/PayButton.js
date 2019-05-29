import React, {Component} from "react";
import {Alert, Linking} from "react-native";
import {API, AuthHeaders, token} from "../../global";
import {Button} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import axios from 'axios';

export default class PayButton extends Component {
    constructor(props) {
        super(props);
    }

    CheckOutOrder() {
        let URL = API.BASE_URL + "cart/checkout";
        console.log("CheckOutOrder token: " + token);

        if (token !== null) {
            axios.get(URL, {
                headers: AuthHeaders(token)
            }).then((response) => {
                console.log(response);
                if (response.data.data.status === true) {
                    Linking.openURL(response.data.data.payment.redirect_url);
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
            <Button onPress={this.CheckOutOrder.bind(this)} style={{marginTop: 15}} title={"Betalen"}/>
        )
    }
}