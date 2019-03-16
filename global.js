import VersionNumber from 'react-native-version-number';
import React from "react";
import {Platform, StyleSheet} from "react-native";

export class AppColors {
    static AppColors = {
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
}

export class Styles {
    static styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: 'flex-end',
        },

        buttonSection: {
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: 'center'
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
}

export class API {
    static BASE_URL = "https://herman.wardpieters.nl/api/";
    static USER_AGENT = "Herman/" + VersionNumber.appVersion + " (" + VersionNumber.buildVersion + "; " + VersionNumber.bundleIdentifier + ")";
    static API_KEY = "9F5#CEgdwej2dF538k56M!$C";
}