/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { View, TextInput, TouchableHighlight, Text } from "react-native";
import SharedStyles from "../styles/shared";

/**
 * Here mobility SDK wrapper.
 */
const { HereMobilitySDK } = require("react-native-here-mobility-sdk");

/**
 * The apps key and expiration.
 */
const APP_KEYS = {
  appKey: "YOUR_SDK_APP_ID",
  appSecret: "YOUR_SDK_APP_SECRET",
  expiration: () => {
    let aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    return Math.round(aYearFromNow.getTime() / 1000);
  }
};

export default class UserRegistration extends Component {
  /**
   * Screen navigation title.
   */
  static navigationOptions = {
    title: "Registration"
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: "User_Name"
    };
  }

  render() {
    return (
      <View style={SharedStyles.container}>
        <Text style={SharedStyles.menuButtonSecondaryText}>
          Enter user name
        </Text>
        <TextInput
          style={SharedStyles.margin10}
          editable={true}
          onChangeText={text => {
            this.setState({ userName: text });
          }}
          value={this.state.userName}
        />
        <TouchableHighlight
          style={SharedStyles.menuButton}
          onPress={() => {
            this.registerUser();
            this.props.navigation.goBack();
          }}
        >
          <Text style={SharedStyles.menuButtonSecondaryText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }

  // The user registration should be done with your app's backend (see the documentation for more info).
  registerUser = () => {
    let userName = this.state.userName;
    let expiration = APP_KEYS.expiration();
    let hash = generateHMAC(
      userName,
      APP_KEYS.appKey,
      APP_KEYS.appSecret,
      expiration
    );
    HereMobilitySDK.setUser({
      userId: userName,
      expirationSec: expiration,
      hash: hash
    });
  };
}

// This is a snippet to generate the token in the app, for testing purposes.
const generateHMAC = (userID, appKey, appSecret, expiration) => {
  var CryptoJS = require("crypto-js");

  var appKey64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(appKey));
  var userID64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(userID));
  var data = appKey64 + "." + userID64 + "." + expiration;

  var hash = CryptoJS.HmacSHA256(data, appSecret);
  return hash.toString();
};
