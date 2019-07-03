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

    CheckOutOrder = () => {
        this.props.updateLoading(true);

        let URL = API.BASE_URL + "cart/checkout";
        console.log("CheckOutOrder token: " + token);

        if (token !== null) {
            axios.get(URL, {
                headers: AuthHeaders(token)
            }).then((response) => {
                this.props.updateLoading(false);
                console.log(response);
                if (response.data.data.status === true) {
                    Linking.openURL(response.data.data.payment.redirect_url);
                } else {
                    Alert.alert("Fout", response.data.data.message);
                }
            })
                .catch(error => {
                    this.props.updateLoading(false);
                    console.log(error.response);
                    Alert.alert("Error", error.message);
                });
        } else {
            this.props.updateLoading(false);
            // Token is null so log user out
            Actions.auth();
        }
    };

    render() {
        return (
            <Button onPress={this.CheckOutOrder} containerStyle={{marginTop: 10}} title={"Betalen"}/>
        )
    }
}