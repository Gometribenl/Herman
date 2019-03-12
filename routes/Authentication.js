import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Authentication extends Component {

    constructor() {
        super();

        this.state = {
            username: null,
            password: null
        };
    }

    static userSignup() {
        Actions.Home();
        //Actions.replace('home');
    }

    static userLogin() {
        Actions.Home();
        //Actions.replace('home');
    }

    render() {
        return (
            <View>
                <Text>Welcome</Text>

                <View>
                    <TextInput
                        editable={true}
                        onChangeText={(username) => this.setState({username})}
                        placeholder='Username'
                        ref='username'
                        returnKeyType='next'
                        value={this.state.username}
                    />

                    <TextInput
                        editable={true}
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Password'
                        ref='password'
                        returnKeyType='next'
                        secureTextEntry={true}
                        value={this.state.password}
                    />

                    <TouchableOpacity onPress={Authentication.userLogin.bind(this)}>
                        <Text>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={Authentication.userSignup.bind(this)}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Authentication;