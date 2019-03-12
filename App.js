import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from "./routes/Home";
import Authentication from "./routes/Authentication";

class App extends Component {
    render() {
        return(
            <Router>
                <Scene key='root'>
                    <Scene
                        component={Authentication}
                        hideNavBar={true}
                        initial={true}
                        key='Auth'
                        title='Authentication'
                    />
                    <Scene
                        component={Home}
                        hideNavBar={true}
                        key='Home'
                        title='Home'
                    />
                </Scene>
            </Router>
        )
    }
}

export default App;