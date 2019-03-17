import React, {Fragment, Component} from "react";
import {SafeAreaView, View} from "react-native";
import {AppColors} from "../global";

export default class AppLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: this.props.topColor}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: this.props.bottomColor}}>
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        {this.props.children}
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}

AppLayout.defaultProps = {
    topColor: AppColors.AppColors.primary.dark,
    bottomColor: AppColors.AppColors.secondary.dark
};