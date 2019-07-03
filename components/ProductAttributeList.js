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
            tmpArray[item.id] = !!this.props.defaultValue;
        });

        this.setState({
            checkBoxChecked: tmpArray
        });
    }

    checkBoxChanged(id, value) {
        if (this.props.onClick !== null) {
            let tempCheckBoxChecked = this.state.checkBoxChecked;
            tempCheckBoxChecked[id] = !value;

            this.setState({
                checkBoxChecked: tempCheckBoxChecked
            });

            this.props.onClick(id, !value);
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                {
                    this.props.attributes.map((item) => {
                        let checkedIcon = this.props.checkedIcon;
                        let title = item.name + " - " + item.price_formatted;

                        if (item.name.toLowerCase().includes("zonder")) {
                            checkedIcon = "minus-square-o";
                        }

                        console.log(item);

                        if (item.price === 0 || item.price === "0") title = item.name;

                        return (
                            <CheckBox
                                key={item.id}
                                title={title}
                                checkedIcon={checkedIcon}
                                uncheckedIcon={this.props.uncheckedIcon}
                                uncheckedColor={this.props.uncheckedColor}
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

ProductAttributeList.defaultProps = {
    checkedIcon: "check-square-o",
    uncheckedIcon: "square-o",
    uncheckedColor: "#bfbfbf",
    onClick: null
};
