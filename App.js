import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';

import FetchProducts from './components/FetchProducts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
});

export default class HermanApp extends Component {

  render() {
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{ text: 'Title', style: { color: '#fff' } }}
            />

            <FetchProducts/>
        </View>
    );
  }
}