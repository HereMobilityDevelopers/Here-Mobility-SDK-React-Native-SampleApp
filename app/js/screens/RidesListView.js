import React, { Component } from "react";
import { Text, View, ListView, TouchableHighlight } from "react-native";
import SharedStyles from "../styles/shared";

const RideCell = props => {
  return (
    <View style={SharedStyles.publicTransportCell}>
      <Text>Ride ID: {props.ride.rideId}</Text>
      <Text>Status: {props.ride.statusLog.currentStatus}</Text>
      <Text>
        Created at: {new Date(props.ride.statusLog.createTime).toString()}
      </Text>
    </View>
  );
};

export default class RidesListView extends Component {
  static navigationOptions = {
    title: "Rides List"
  };

  constructor(props) {
    super(props);
    const { rides } = this.props.navigation.state.params;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(rides)
    };
  }

  render() {
    return (
      <ListView
        enableEmptySections
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        dataSource={this.state.dataSource}
        renderRow={rowData => this.getRow(rowData)}
      />
    );
  }

  getRow(ride) {
    return (
      <TouchableHighlight onPress={() => this.onRidePress(ride)}>
        <RideCell ride={ride} />
      </TouchableHighlight>
    );
  }

  onRidePress(ride) {
    this.props.navigation.navigate("RideDetails", { ride: ride });
  }
}
