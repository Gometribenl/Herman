import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import FetchProducts from './components/FetchProducts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default class HermanApp extends Component {

  render() {
    return (
        <View style={ styles.container }>
            <FetchProducts/>
        </View>
    );
  }
}