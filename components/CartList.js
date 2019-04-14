import React, {Component} from "react";
import {View} from 'react-native';
import {ListItem} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Display from 'react-native-display';

export default class CartList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
        }
    }

    render() {
        return (
            <View>
                <ListItem
                    rightAvatar={
                        <Icon name="trash-o" size={23} color="#000"/>
                    }
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    onPress={() => {
                        this.setState({
                            hidden: !this.state.hidden
                        });
                    }}
                    leftAvatar={{
                        overlayContainerStyle: {
                            backgroundColor: 'transparent'
                        },
                        rounded: false,
                        size: "large",
                        imageProps: {
                            resizeMode: "contain"

                        },
                        source: {
                            uri: this.props.avatar_url
                        }
                    }}
                    containerStyle={{
                        backgroundColor: "#f5f5f5",
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                />

                <Display enable={this.state.hidden} style={{backgroundColor: "#f5f5f5"}}>
                    {this.props.children}
                </Display>

            </View>
        )
    }
}
