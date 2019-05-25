import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from "./routes/Home";
import Login from "./routes/Auth/Login";
import Products from "./routes/Products";
import Orders from "./routes/Orders";
import ShoppingCart from "./routes/ShoppingCart";
import Register from "./routes/Auth/Register";

export default class App extends Component {

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        component={Login}
                        hideNavBar={true}
                        initial={true}
                        key='auth'
                        title='Authentication'
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
                </Scene>
            </Router>
        )
    }
}