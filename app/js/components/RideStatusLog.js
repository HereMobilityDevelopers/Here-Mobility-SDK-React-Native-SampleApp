/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Text, View, ListView } from "react-native";

/**
 * Present Ride status log
 */
export class RideStatusLog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.props.dataSource}
          renderRow={rideStatus => this.getRow(rideStatus)}
        />
        <Text style={{ marginTop: 20 }}>
          Current status: {this.props.currentStatus}
        </Text>
      </View>
    );
  }

  getRow(record) {
    return (
      <View>
        <Text>{record.status}</Text>
        <Text>{new Date(record.timestamp).toString()}</Text>
      </View>
    );
  }
}
