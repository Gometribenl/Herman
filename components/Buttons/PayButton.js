import React, {Component} from "react";
import {Alert, Linking} from "react-native";
import {API} from "../../global";
import AsyncStorage from "@react-native-community/async-storage";
import {Button} from "react-native-elements";

export default class PayButton extends Component {
    constructor(props) {
        super(props);
    }

    CheckOutOrder() {
        AsyncStorage.getItem('jwt').then((token) => {
            if (token !== null) {
                let URL = API.BASE_URL + "cart/checkout";
                fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': API.USER_AGENT,
                        'Authorization': "Bearer " + token
                    }
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        if (responseData.data.status === true) {
                            // Open redirect URL in browser
                            Linking.openURL(responseData.data.payment.redirect_url);
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
            <Button onPress={this.CheckOutOrder.bind(this)} style={{marginTop: 15}} title={"Betalen"}/>
        )
    }
}