import React, {Component} from "react";
import {DURATION} from "react-native-easy-toast";
import {ListItem} from "react-native-elements";

export default class CustomListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem
                leftAvatar={{
                    rounded: false,
                    size: "large",
                    imageProps: {
                        resizeMode: "contain",
                        backgroundColor: "transparent"
                    },
                    source: {
                        uri: "http://localhost/img.png"
                    }
                }}
                title={"Bestelling #" + item.id.toString()}
                subtitle={"Betaald met: " + item.payment_method.toString()}
                onPress={() => {
                    this.refs.toast.show(item.id.toString(), DURATION.LENGTH_SHORT);
                }}
            />
        )
    }
}