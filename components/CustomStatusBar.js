import React from "react";
import {StatusBar} from "react-native";
import {AppColors} from "../global";

export default class CustomStatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StatusBar backgroundColor={this.props.backgroundColor} barStyle="light-content"/>
        )
    }
}

CustomStatusBar.defaultProps = {
    backgroundColor: AppColors.AppColors.primary.dark
};