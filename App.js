import React, { Component } from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { Header,ThemeProvider } from 'react-native-elements';

import FetchProducts from './components/FetchProducts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        height: Platform.select({
            android: 56,
            default: 44,
        }),

        // Fix Header height in Android
        paddingTop: Platform.select({
            android: 0
        })
    },
});

export default class HermanApp extends Component {

    render() {
        return (
            <ThemeProvider>
                <Header
                    centerComponent={{ text: 'Herman Snackcorner', style: { color: '#fff' } }}
                    containerStyle={styles.headerContainer}
                />
                <FetchProducts/>
            </ThemeProvider>
        );
    }
}

export class GlobalVariables {
    static BASE_URL = "https://herman.wardpieters.nl/api/";
}