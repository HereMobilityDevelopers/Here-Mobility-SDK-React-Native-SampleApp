import React, { Component } from "react";
import { Text, ListView, View } from "react-native";
import SharedStyles from "../styles/shared";

/**
 * The length of the leg in meters, if known in advance.
 */
const Length = props => {
  return <Text>Length: {props.length} meters</Text>;
};

/**
 * The estimated duration of this leg, in milliseconds, if known.
 */
const Duration = props => {
  return(
  <Text>
    Duration: {PublicTransportView.convertMS(props.estimatedDurationMs).minutes}{" "}
    minutes.
  </Text>);
};

/**
 * The name of the line. null if leg.transportMode is TransportMode.WALK,
 * otherwise always exist.
 */
const LineName = props => {
  return <Text>Line name: {props.lineName}</Text>;
};

/**
 * The operator of the line.
 */
const OperatorName = props => {
  return <Text>OperatorName: {props.operatorName}</Text>;
};

/**
 * Public transport view shows the public transport legs.
 * Leg is a list of transportation sections for the route.
 */
export default class PublicTransportView extends Component {
  static navigationOptions = {
    title: "Public transport Details"
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(
        this.props.navigation.state.params.offer.legs
      )
    };
  }

  render() {
    return (
      <View style={SharedStyles.screenContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={leg => this.getRow(leg)}
        />
      </View>
    );
  }

  getRow(leg) {
    const {
      length,
      estimatedDurationMs,
      lineName,
      operatorName,
      transportMode
    } = leg;

    return (
      <View style={SharedStyles.publicTransportCell}>
        <Text>Transport mode: {transportMode}</Text>
        {length ? <Length length={length} /> : null}
        {estimatedDurationMs ? (
          <Duration estimatedDurationMs={estimatedDurationMs} />
        ) : null}
        {lineName ? <LineName lineName={lineName} /> : null}
        {operatorName ? <OperatorName operatorName={operatorName} /> : null}
      </View>
    );
  }

  // Convert ms to time format.
  static convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      days: day,
      hours: hour,
      minutes: minute,
      seconds: seconds
    };
  }
}
