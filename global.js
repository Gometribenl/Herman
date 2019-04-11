import VersionNumber from 'react-native-version-number';
import React from "react";
import {Platform, StyleSheet} from "react-native";

export class AppColors {
    static AppColors = {
        primary: {
            regular: "#ffc90e",
            light: "#fffc54",
            dark: "#c79900",
        },
        secondary: {
            regular: "#ffc90e",
            light: "#fffc54",
            dark: "#c79900",
        }
    };
}

export class API {
    //tatic BASE_URL = "https://herman.wardpieters.nl/api/";
    static BASE_URL = "http://10.0.2.2/api/";
    static USER_AGENT = "Herman/" + VersionNumber.appVersion + " (" + VersionNumber.buildVersion + "; " + VersionNumber.bundleIdentifier + ")";
}