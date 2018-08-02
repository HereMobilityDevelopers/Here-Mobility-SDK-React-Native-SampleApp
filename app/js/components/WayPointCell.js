/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { TextInput, View, Text } from "react-native";

type Props = {
  point: { lat: string, lon: string },
  title: string,
  pointChanged: point => void
};
/**
 * Present editable way point.
 */
export class WayPointCell extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <Text>{this.props.title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text>lat:</Text>
          <TextInput
            style={{ flex: 1 }}
            editable={true}
            onChangeText={text =>
              this.props.pointChanged({ lat: text, lon: this.props.point.lon })
            }
            value={this.props.point.lat}
          />
          <Text>lon:</Text>
          <TextInput
            style={{ flex: 1 }}
            editable={true}
            onChangeText={text =>
              this.props.pointChanged({ lat: this.props.point.lat, lon: text })
            }
            value={this.props.point.lon}
          />
        </View>
      </View>
    );
  }
}
