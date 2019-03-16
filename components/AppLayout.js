import {SafeAreaView, View} from "react-native";
import React, {Fragment} from "react";
import {AppColors} from "../global";

export default class AppLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: AppColors.AppColors.primary.dark}}/>
                <SafeAreaView style={{flex: 1, backgroundColor: AppColors.AppColors.secondary.dark}}>
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        {this.props.children}
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}