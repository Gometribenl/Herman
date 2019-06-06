import VersionNumber from 'react-native-version-number';
import React from "react";
import axios from "axios";

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

export let deviceToken = undefined;
export function updateDeviceToken(newToken) {
    deviceToken = newToken;
}

export function registerDevice() {
    axios.post(API.BASE_URL + "device/register", {
        deviceToken: deviceToken
    }, {
        headers: AuthHeaders
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
}

export class API {
    static IMAGE_URL = "https://herman.wardpieters.nl/images/";
    static BASE_URL = "https://herman.wardpieters.nl/api/";
    static USER_AGENT = "Herman/" + VersionNumber.appVersion + " (" + VersionNumber.buildVersion + "; " + VersionNumber.bundleIdentifier + ")";
}

export let token = undefined;
export function updateToken(newToken) {
    token = newToken;
}

export function AuthHeaders(token) {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': API.USER_AGENT,
        'Authorization': "Bearer " + token
    }
}

export let Headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': API.USER_AGENT
};