/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import SharedStyles from "../styles/shared";

const IconPlaceholder = require("../../img/ic_driver_placeholder.png");
/**
 * Present driver details.
 * The driver can be null if the ride is still waiting for driver assignment.
 */
export class DriverCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { driver } = this.props;
    if (!driver) {
      return <View style={SharedStyles.margin10} />;
    }
    return (
      <View style={[SharedStyles.centerRowContainer, SharedStyles.margin10]}>
        <Image
          source={driver.photoUrl ? { uri: driver.photoUrl } : IconPlaceholder}
          style={{ width: 44, height: 44 }}
          defaultSource={IconPlaceholder}
        />
        <Text style={{ flex: 1, margin: 10 }}>{driver.name}</Text>
      </View>
    );
  }
}
