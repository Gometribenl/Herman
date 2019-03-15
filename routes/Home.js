import React, {Component} from 'react';
import {
    Alert,
    AsyncStorage,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Header} from 'react-native-elements';
import BottomNavigation, {Badge, FullTab} from 'react-native-material-bottom-navigation'
import {Actions} from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome';
import FetchProducts from '../components/FetchProducts';
import {AppColors} from "../global";

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
            label: 'Home',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'products',
            icon: 'list',
            label: 'Producten',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'orders',
            icon: 'credit-card',
            label: 'Bestellingen',
            barColor: AppColors.AppColors.secondary.regular,
        },
        {
            key: 'cart',
            icon: 'shopping-cart',
            label: 'Winkelwagen',
            barColor: AppColors.AppColors.secondary.regular,
            badgeCount: 1,
        }
    ];

    state = {
        activeTab: 'home',
        deviceId: ''
    };

    testIdToken() {
        AsyncStorage.getItem('jwt').then((token) => {
            console.warn("jwt: " + token);

            fetch('https://10.0.2.2:3001/api/protected/random-quote', {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token}
            })
                .then((response) => response.text())
                .then((response) => console.warn(response.toString()))
                .then((quote) => {
                    //Alert.alert('testIdToken result', quote)
                })
                .done();
        })
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
            <SafeAreaView style={{flex: 1, backgroundColor: AppColors.AppColors.secondary.dark}}>
            <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.container}>

                    <StatusBar backgroundColor={AppColors.AppColors.primary.dark} barStyle="light-content"/>

                    <Header
                        centerComponent={{text: 'Hermans Snackcorner', style: {color: '#fff', fontSize: RF(2.75)}}}
                        containerStyle={styles.headerContainer}
                        rightComponent={<Icon name="sign-out" size={30} onPress={this.userLogout}/>}
                    />

                    <TouchableOpacity onPress={this.testIdToken}>
                        <Text>Test id_token</Text>
                    </TouchableOpacity>

                    <FetchProducts/>
                </View>

                <BottomNavigation
                    style={{
                        paddingBottom: Platform.select({
                            ios: 0,

                        })
                    }}
                    tabs={this.tabs}
                    activeTab={this.state.activeTab}
                    onTabPress={newTab => this.setState({activeTab: newTab.key})}
                    renderTab={this.renderTab}
                    renderBadge={this.renderBadge}
                />

            </View>
            </View>
            </SafeAreaView>
        );
    }
}

export default Home;