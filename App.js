import React, { Component } from 'react';
import { View, StyleSheet, Platform, AsyncStorage, StatusBar, YellowBox} from 'react-native';
import { Header } from 'react-native-elements';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import FetchProducts from './components/FetchProducts';

const AppColors = {
    primary: {
        regular: "#ff3131",
        light: "#ff6d5c",
        dark: "#c30007",
    },
    secondary: {
        regular: "#ffc90e",
        light: "#fffc54",
        dark: "#c79900",
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-end',
    },
    headerContainer: {
        height: Platform.select({
            android: 56,
            default: 44,
        }),

        // Fix Header height in Android
        paddingTop: Platform.select({
            android: 0
        }),

        backgroundColor: AppColors.primary.regular
    },
});

export default class HermanApp extends Component {

    tabs = [
        {
            key: 'home',
            icon: 'home',
            label: 'Home',
            barColor: AppColors.secondary.regular,
        },
        {
            key: 'products',
            icon: 'list',
            label: 'Producten',
            barColor: AppColors.secondary.regular,
        },
        {
            key: 'orders',
            icon: 'credit-card',
            label: 'Bestellingen',
            barColor: AppColors.secondary.regular,
        },
        {
            key: 'cart',
            icon: 'shopping-cart',
            label: 'Winkelwagen',
            barColor: AppColors.secondary.regular,
        }
    ];

    state = {
        activeTab: 'home',
        deviceId: ''
    };

    componentDidMount() {
        this.setState({ deviceId: DeviceInfo.getUniqueID() });
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon}/>
    );

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    );

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={AppColors.primary.dark} barStyle="light-content" />
                    <Header
                        centerComponent={{ text: 'Hermans Snackcorner', style: { color: '#fff' } }}
                        containerStyle={styles.headerContainer}
                    />
                    <FetchProducts/>
                </View>
                <BottomNavigation
                    tabs={this.tabs}
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                    renderTab={this.renderTab}
                />
            </View>
        );
    }
}

export class GlobalVariables {
    static BASE_URL = "https://herman.wardpieters.nl/api/";
}