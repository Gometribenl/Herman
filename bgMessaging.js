import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';
import {Platform} from "react-native";

export default async (notification: RemoteMessage) => {
    // handle your message

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

    return Promise.resolve();
}