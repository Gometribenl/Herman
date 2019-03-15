import React, {Component} from 'react';
import {Alert, AsyncStorage, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import BottomNavigation, {Badge, IconTab} from 'react-native-material-bottom-navigation'
import {Actions} from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
import FetchProducts from '../components/FetchProducts';
import {API, AppColors} from "../global";

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

        backgroundColor: AppColors.AppColors.primary.regular,
    },
});

class Home extends Component {

    tabs = [
        {
            key: 'home',
            icon: 'home',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'products',
            icon: 'list',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'orders',
            icon: 'credit-card',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'cart',
            icon: 'shopping-cart',
            barColor: AppColors.AppColors.secondary.regular,
            badgeCount: 1,
        }
    ];

    state = {
        activeTab: 'home',
        deviceId: ''
    };

    async userLogout() {
        try {
            await AsyncStorage.removeItem('jwt');
            Alert.alert("Success", "You have been successfully logged out!");
            Actions.Auth();
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    renderIcon = icon => () => {
        return <Icon size={24} color="white" name={icon}/>;
    };

    renderBadge = badgeCount => () => {
        return <Badge>{badgeCount}</Badge>
    };

    renderTab = ({tab, isActive}) => {
        return <IconTab
            isActive={isActive}
            key={tab.key}
            renderIcon={this.renderIcon(tab.icon)}
            renderBadge={this.renderBadge(tab.badgeCount)}
            showBadge={tab.badgeCount > 0}
        />;
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>

                    <StatusBar backgroundColor={AppColors.AppColors.primary.dark} barStyle="light-content"/>

                    <Header
                        centerComponent={{text: 'Hermans Snackcorner', style: {color: '#fff', fontSize: RF(2.75)}}}
                        containerStyle={styles.headerContainer}
                        rightComponent={<Icon name="sign-out" size={30} onPress={this.userLogout}/>}
                    />

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