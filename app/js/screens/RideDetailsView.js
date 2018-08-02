/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Text, TouchableHighlight, View, ListView } from "react-native";

import SharedStyles from "../styles/shared";
import { RideStatusLog } from "../components/RideStatusLog";
import { RideDetails } from "../components/RideDetails";

/**
 * Here mobility SDK demand wrapper.
 */
const { HereMobilitySDKDemand } = require("react-native-here-mobility-sdk");

const CancelRideButton = props => {
  return (
    <TouchableHighlight
      style={SharedStyles.cancelButton}
      onPress={props.onPress}
    >
      <Text style={SharedStyles.menuButtonSecondaryText}>CANCEL RIDE</Text>
    </TouchableHighlight>
  );
};

/**
 * Present the ride status, supplier info, driver info, and real time ride detail and status updates.
 */
const RideStatus = props => {
  return (
    <View style={{ margin: 10, flex: 1 }}>
      <RideDetails
        ride={props.ride}
        rideLocationUpdate={props.rideLocationUpdate}
      />
      <RideStatusLog
        dataSource={props.previousStatuses}
        currentStatus={props.currentStatus}
      />
    </View>
  );
};

export default class RideDetailsView extends Component {
  static navigationOptions = {
    title: "Ride Details"
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const currentRide = this.props.navigation.state.params.ride;
    this.state = {
      ride: currentRide,
      currentStatus: currentRide.statusLog.currentStatus,
      rideLocationUpdate: null,
      dataSource: ds.cloneWithRows(currentRide.statusLog.previousStatuses)
    };

    // Register for rides updates.
    // Notify when ride status is updated.
    HereMobilitySDKDemand.registerForRidesUpdates(
      this.onRideStatusChanged.bind(this),
      this.onRideLocationChanged.bind(this),
      error => {}
    );
  }

  // Unregister demand client.
  componentWillUnmount() {
    HereMobilitySDKDemand.unregisterFromRidesUpdates();
  }

  render() {
    const { ride, rideLocationUpdate } = this.state;
    return (
      <View style={SharedStyles.screenContainer}>
        <RideStatus
          ride={ride}
          rideLocationUpdate={rideLocationUpdate}
          previousStatuses={this.state.dataSource}
          currentStatus={this.state.currentStatus}
        />
        <CancelRideButton onPress={() => this.onCancelRidePress()} />
      </View>
    );
  }

  onCancelRidePress() {
    const { navigation } = this.props;
    HereMobilitySDKDemand.cancelRide(
      this.state.ride.rideId,
      "User canceled the ride.",
      function(response, err) {
        if (err) {
          alert(err);
        } else {
          console.log(response);
          navigation.goBack();
        }
      }
    );
  }

  onRideStatusChanged(ride, rideStatusLog) {
    if (
      this.state.ride.rideId === ride.rideId &&
      rideStatusLog.previousStatuses
    ) {
      this.setState({
        currentStatus: rideStatusLog.currentStatus,
        // Ride can be updated on status updates, e.g: new driver assigned.
        // So it's recommended to update the component state on every status update.
        ride: ride,
        rideStatus: rideStatusLog,
        dataSource: this.state.dataSource.cloneWithRows(
          rideStatusLog.previousStatuses
        )
      });
    }
  }

  onRideLocationChanged(ride, rideLocation) {
    if (this.state.ride.rideId === ride.rideId) {
      this.setState({
        ride: ride,
        rideLocationUpdate: rideLocation
      });
    }
  }
}
