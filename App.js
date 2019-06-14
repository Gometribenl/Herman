import React, {Component} from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Home from "./routes/Home";
import Login from "./routes/Auth/Login";
import Products from "./routes/Products";
import Orders from "./routes/Orders";
import ShoppingCart from "./routes/ShoppingCart";
import Register from "./routes/Auth/Register";
import firebase from 'react-native-firebase';
import {updateDeviceToken} from "./global";
import {FirebaseInit} from "./FirebaseInit";

export default class App extends Component {

    componentDidMount() {
        FirebaseInit('hermanDefault');

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log("New Firebase token: " + fcmToken);
            updateDeviceToken(fcmToken);
        });
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
    }

    render() {
        return (
            <Router>
                <Stack key='root'>
                    <Scene
                        component={Login}
                        hideNavBar={true}
                        initial={true}
                        key='auth'
                        title='Login'
                    />
                    <Scene
                        component={Register}
                        hideNavBar={true}
                        key='register'
                        title='Register'
                    />
                    <Scene
                        component={Home}
                        hideNavBar={true}
                        key='home'
                        title='Home'
                    />
                    <Scene
                        component={Products}
                        hideNavBar={true}
                        key='products'
                        title='Products'
                    />
                    <Scene
                        component={Orders}
                        hideNavBar={true}
                        key='orders'
                        title='Orders'
                    />
                    <Scene
                        component={ShoppingCart}
                        hideNavBar={true}
                        key='cart'
                        title='Cart'
                    />
                </Stack>
            </Router>
        )
    }
}