/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Image, View, Text, Switch } from "react-native";
import UIStepper from "react-native-ui-stepper";
import SharedStyles from "../styles/shared";

const passengerIcon = require("../../img/passenger.png");
const suitcaseIcon = require("../../img/suitcase.png");

type Props = {
  bookingDetails: {
    bookingConstraints: {
      passengerCount: number,
      passengerSuitcase: number
    },
    //leave time, null if leave now.
    leaveTime: Date,
    isTimePickerVisible: boolean,
    bookingNowSwitcher: boolean
  },
  bookingDetailsChanged: (bookingDetails) => void
};

const BookingConstraints = props => {
  return (
    <View
      borderColor="gray"
      borderWidth={1}
      opacity={0.5}
      style={SharedStyles.borderView}
    >
      <View style={SharedStyles.passengerDetailsCell}>
        <Image source={passengerIcon} style={SharedStyles.size20} />
        <Text style={SharedStyles.fillRow}>Passengers</Text>
        <UIStepper
          initialValue={1}
          minimumValue={1}
          maximumValue={8}
          displayValue
          tintColor="#06b87c"
          textColor="#06b87c"
          borderColor="#06b87c"
          alignSelf="flex-end"
          onValueChange={value => {
            props.bookingDetailsChanged({
              ...props.bookingDetails,
              bookingConstraints: {
                ...props.bookingDetails.bookingConstraints,
                passengerCount: value
              }
            });
          }}
        />
      </View>
      <View style={SharedStyles.passengerDetailsCell}>
        <Image source={suitcaseIcon} style={SharedStyles.size20} />
        <Text style={SharedStyles.fillRow}>Suitcases</Text>
        <UIStepper
          initialValue={0}
          minimumValue={0}
          maximumValue={4}
          displayValue
          tintColor="#06b87c"
          textColor="#06b87c"
          borderColor="#06b87c"
          onValueChange={value => {
            props.bookingDetailsChanged({
              ...props.bookingDetails,
              bookingConstraints: {
                ...props.bookingDetails.bookingConstraints,
                passengerSuitcase: value
              }
            });
          }}
        />
      </View>
    </View>
  );
};

const BookingTime = props => {
  return (
    <View
      borderColor="gray"
      borderWidth={1}
      opacity={0.5}
      style={SharedStyles.borderView}
    >
      <View style={SharedStyles.centerRowContainer}>
        <Text style={SharedStyles.fillRow}>Booking now?</Text>
        <Switch
          onValueChange={value => {
            props.bookingDetailsChanged({
              ...props.bookingDetails,
              bookingNowSwitcher: value,
              isTimePickerVisible: !value,
              leaveTime: value ? null : props.bookingDetails.leaveTime
            });
          }}
          value={props.bookingDetails.bookingNowSwitcher}
        />
      </View>
      {// Check if time to leave should be render.
      !props.bookingDetails.leaveTime ? null : (
        <Text style={{ margin: 10 }}>
          Leave at: {props.bookingDetails.leaveTime.toString()}
        </Text>
      )}
    </View>
  );
};

/**
 * Present editable way point.
 */
export class BookingDetails extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={SharedStyles.margin10}>Ride Details</Text>
        <BookingConstraints
          bookingDetails={this.props.bookingDetails}
          bookingDetailsChanged={this.props.bookingDetailsChanged}
        />
        <Text style={SharedStyles.margin10}>Booking Details</Text>
        <BookingTime
          bookingDetails={this.props.bookingDetails}
          bookingDetailsChanged={this.props.bookingDetailsChanged}
        />
      </View>
    );
  }
}
