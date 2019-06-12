import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Home from "./routes/Home";
import Login from "./routes/Auth/Login";
import Products from "./routes/Products";
import Orders from "./routes/Orders";
import ShoppingCart from "./routes/ShoppingCart";
import Register from "./routes/Auth/Register";
import firebase from 'react-native-firebase';
import {updateDeviceToken} from "./global";

export default class App extends Component {

    componentDidMount() {
        const channel = new firebase.notifications.Android.Channel(
            'hermanDefault',
            'Standaard',
            firebase.notifications.Android.Importance.Max
        ).setDescription('Alle notificaties voor deze app');

        firebase.notifications().android.createChannel(channel);

        this.FirebaseInit();

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log("New Firebase token: " + fcmToken);
            updateDeviceToken(fcmToken);
        });
    }

    FirebaseInit() {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    console.log("User has given the app permission to send notifications");

                    firebase.messaging().getToken()
                        .then(fcmToken => {
                            if (fcmToken) {
                                console.log(fcmToken);
                                updateDeviceToken(fcmToken);
                            }
                        });
                } else {
                    // User has not allowed notifications so request permission
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // User has authorised
                            console.log("User has authorised");
                        })
                        .catch(error => {
                            // User has rejected permissions
                        });
                }
            });

        this.messageListener = firebase.notifications().onNotification((notification) => {
            if (Platform.OS === 'android') {

                const localNotification = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true,
                })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .android.setChannelId('hermanDefault') // e.g. the id you chose above
                    .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
                    .android.setPriority(firebase.notifications.Android.Priority.Max);

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));

            } else if (Platform.OS === 'ios') {

                const localNotification = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .ios.setBadge(notification.ios.badge);

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));

            }
        });
    }

    componentWillUnmount() {
        this.messageListener();
        this.onTokenRefreshListener();
    }

    render() {
        return (
            <Router>
                <Stack key='root'>
                    <Scene
                        component={Login}
                        hideNavBar={true}
                        initial={true}
                        key='auth'
                        title='Login'
                    />
                    <Scene
                        component={Register}
                        hideNavBar={true}
                        key='register'
                        title='Register'
                    />
                    <Scene
                        component={Home}
                        hideNavBar={true}
                        key='home'
                        title='Home'
                    />
                    <Scene
                        component={Products}
                        hideNavBar={true}
                        key='products'
                        title='Products'
                    />
                    <Scene
                        component={Orders}
                        hideNavBar={true}
                        key='orders'
                        title='Orders'
                    />
                    <Scene
                        component={ShoppingCart}
                        hideNavBar={true}
                        key='cart'
                        title='Cart'
                    />
                </Stack>
            </Router>
        )
    }
}