import React, {Component} from "react";
import {View} from 'react-native';
import {CheckBox} from "react-native-elements";

export default class ProductAttributeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkBoxChecked: []
        };
    }

    componentWillMount() {
        let tmpArray = [];

        this.props.attributes.map((item) => {
            tmpArray[item.id] = false;
        });

        this.setState({
            checkBoxChecked: tmpArray
        });
    }

    checkBoxChanged(id, value) {
        let tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        });

        this.props.onClick(id, !value);
    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                {
                    this.props.attributes.map((item) => {
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
