import firebase from "react-native-firebase";
import {updateDeviceToken} from "./global";
import {Platform} from "react-native";

export function FirebaseInit(channelId) {
    const channel = new firebase.notifications.Android.Channel(
        channelId,
        'Standaard',
        firebase.notifications.Android.Importance.Max
    ).setDescription('Alle notificaties voor deze app');

    firebase.notifications().android.createChannel(channel);

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