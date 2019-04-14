import React, {Component} from "react";
import {Text, View} from 'react-native';
import {ListItem} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Display from 'react-native-display';

export default class CustomListItem extends Component {
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
                        <Icon name="arrow-down" size={25} color="#000"/>
                    }
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    onPress={() => {
                        if(!this.props.children != null) {
                            this.setState({
                                hidden: !this.state.hidden
                            });
                        }
                    }}
                />

                <Display enable={this.state.hidden} style={{backgroundColor: "#f5f5f5"}}>
                    {this.props.children}
                </Display>

            </View>
        )
    }
}
