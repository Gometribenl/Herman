import React, {Component} from "react";
import {View} from 'react-native';
import {CheckBox} from "react-native-elements";

let tempCheckValues = [];

export default class ProductAttributeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkBoxChecked: []
        };
    }

    checkBoxChanged(id, value) {
        this.setState({
            checkBoxChecked: tempCheckValues
        });

        let tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        });

    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                {
                    this.props.attributes.map((item) => {

                        tempCheckValues[item.id] = false;

                        return (
                            <CheckBox
                                key={item.id}
                                title={item.name + " - " + item.price_formatted}
                                checked={this.state.checkBoxChecked[item.id]}
                                onPress={() => this.checkBoxChanged(item.id, this.state.checkBoxChecked[item.id])}
                            />
                        );
                    })
                }
            </View>
        );
    }
}
