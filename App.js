import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from "./routes/Home";
import Authentication from "./routes/Authentication";
import ProductList from "./routes/ProductList";

export default class App extends Component {
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
                        component={ProductList}
                        hideNavBar={true}
                        key='products'
                        title='Products'
                    />
                    <Scene
                        component={ProductList}
                        hideNavBar={true}
                        key='orders'
                        title='Orders'
                    />
                    <Scene
                        component={ProductList}
                        hideNavBar={true}
                        key='cart'
                        title='Cart'
                    />
                </Scene>
            </Router>
        )
    }
}