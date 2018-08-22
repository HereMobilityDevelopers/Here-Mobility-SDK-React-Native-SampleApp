/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { View, Button, TouchableHighlight } from "react-native";

import SharedStyles from "../styles/shared";

const USER_AUTH_ERROR = {
  reasons: [
    "User Authentication info wasn't supplied",
    "failed authenticating the user"
  ],
  showRegistrationScreen: reason => {
    return USER_AUTH_ERROR.reasons.find(function(element) {
      return element === reason;
    });
  }
};

/**
 * Here Mobility Demand SDK wrapper.
 */
const { HereMobilitySDKDemand } = require("react-native-here-mobility-sdk");

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRides: false,
      ridesQueryResult: null
    };
  }

  render() {
    return (
      <View style={SharedStyles.container}>
        <TouchableHighlight style={{ margin: 20 }}>
          <Button
            color="#06b87c"
            onPress={() => this.props.navigation.navigate("GetOffers")}
            title="Get Offers"
          />
        </TouchableHighlight>
        {this.state.hasRides ? (
          <Button
            color="#06b87c"
            onPress={() =>
              this.props.navigation.navigate("MyRides", {
                rides: this.state.ridesQueryResult.rides
              })
            }
            title="My Rides"
          />
        ) : null}
      </View>
    );
  }

  /**
   * Get rides request when the component did mount.
   */
  componentDidMount() {
    HereMobilitySDKDemand.getRides(
      {
        limit: 22,
        sortBy: "UPDATE_TIME_ASC"
      },
      (ridesQueryResult, err) => {
        if (err) {
          // If the user authentication token that was provided by HereMobilitySDK.setUserAuthInfo() is expired,
          // UserAuthenticationException will be returned. To handle this, call HereMobilitySDK.setUserAuthInfo()
          // again with a valid token, and initiate the SDK API call again.
          // Note that this exception can be returned from any API call, so this error handling should
          // be implemented on every onError call.
          if (USER_AUTH_ERROR.showRegistrationScreen(err.reason)) {
            this.props.navigation.navigate("UserRegistration");
          } else {
            alert(JSON.stringify(err));
          }
        } else {
          if (ridesQueryResult.rides.length > 0) {
            this.setState({
              hasRides: true,
              ridesQueryResult: ridesQueryResult
            });
          }
        }
      }
    );
  }
}
