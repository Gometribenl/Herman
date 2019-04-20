import React, {Component} from 'react';
import {Linking} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Home from "./routes/Home";
import Authentication from "./routes/Authentication";
import Products from "./routes/Products";
import Orders from "./routes/Orders";
import ShoppingCart from "./routes/ShoppingCart";
export default class App extends Component {

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        component={Authentication}
                        hideNavBar={true}
                        initial={true}
                        key='auth'
                        title='Authentication'
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