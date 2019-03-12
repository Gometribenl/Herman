import React, {Component} from 'react';
import {Alert, View, StyleSheet, Platform, AsyncStorage, StatusBar, YellowBox, TouchableOpacity, Text} from 'react-native';
import {Header} from 'react-native-elements';
import BottomNavigation, {FullTab, Badge} from 'react-native-material-bottom-navigation'
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FetchProducts from '../components/FetchProducts';

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

class Home extends Component {

    getProtectedQuote() {
        Alert.alert('We will print a Chuck Norris quote');
    };

    userLogout() {
        Actions.Auth();
    };

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
            badgeCount: 1,
        }
    ];

    state = {
        activeTab: 'home',
        deviceId: ''
    };

    renderIcon = icon => () => {
        return <Icon size={24} color="white" name={icon}/>;
    };

    renderBadge = badgeCount => () => {
        return <Badge>{badgeCount}</Badge>
    };

    renderTab = ({tab, isActive}) => {
        return <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
            renderBadge={this.renderBadge(tab.badgeCount)}
            showBadge={tab.badgeCount > 0}
        />;
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>

                    <StatusBar backgroundColor={AppColors.primary.dark} barStyle="light-content"/>

                    <Header
                        centerComponent={{text: 'Hermans Snackcorner', style: {color: '#fff'}}}
                        containerStyle={styles.headerContainer}
                        rightComponent={<Icon name="sign-out" size={30} onPress={this.userLogout}/>}
                    />

                    <TouchableOpacity onPress={this.getProtectedQuote}>
                        <Text> Get Chuck Norris quote!</Text>
                    </TouchableOpacity>

                    <FetchProducts/>
                </View>

                <BottomNavigation
                    tabs={this.tabs}
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => this.setState({activeTab: newTab.key})}
                    renderTab={this.renderTab}
                    renderBadge={this.renderBadge}
                />

            </View>
        );
    }
}

export default Home;

export class GlobalVariables {
    static BASE_URL = "https://herman.wardpieters.nl/api/";
}