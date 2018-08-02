/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { RkTextInput, RkTheme } from "react-native-ui-kitten";
import SharedStyles from "../styles/shared";

const nameSmallIcon = require("../../img/name_small.png");
const phoneSmallIcon = require("../../img/phone_small.png");
const notesSmallIcon = require("../../img/notes_small.png");

type Props = {
  passengerDetails: {
    name: string,
    phoneNumber: string,
    passengerNote: string
  },
  passengerDetailsChanged: passengerDetails => void
};

const PassengerName = props => {
  return (
    <View style={SharedStyles.centerRowContainer}>
      <Image source={nameSmallIcon} style={SharedStyles.size20} />
      <RkTextInput
        placeholder={props.passengerDetails.name}
        onChangeText={name =>
          props.passengerDetailsChanged({
            passengerDetails: {
              ...props.passengerDetails,
              name: name
            }
          })
        }
        rkType="passengerDetails"
      />
    </View>
  );
};

const PassengerPhone = props => {
  return (
    <View style={SharedStyles.centerRowContainer}>
      <Image source={phoneSmallIcon} style={SharedStyles.size20} />
      <RkTextInput
        placeholder={props.passengerDetails.phoneNumber}
        onChangeText={phoneNumber =>
          props.passengerDetailsChanged({
            passengerDetails: {
              ...props.passengerDetails,
              phoneNumber: phoneNumber
            }
          })
        }
        keyboardType="numeric"
        rkType="passengerDetails"
      />
    </View>
  );
};

const PassengerNote = props => {
  return (
    <View style={SharedStyles.centerRowContainer}>
      <Image source={notesSmallIcon} style={SharedStyles.size20} />
      <RkTextInput
        placeholder="Note for the driver"
        onChangeText={note =>
          props.passengerDetailsChanged({
            passengerDetails: {
              ...props.passengerDetails,
              passengerNote: note
            }
          })
        }
        rkType="passengerDetails"
      />
    </View>
  );
};

/**
 * Present passenger details
 */
export class PassengerDetails extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={SharedStyles.centerColumnContainerWithStandardMargin}>
        <Text>Your Details</Text>
        <PassengerName
          passengerDetails={this.props.passengerDetails}
          passengerDetailsChanged={this.props.passengerDetailsChanged}
        />
        <PassengerPhone
          passengerDetails={this.props.passengerDetails}
          passengerDetailsChanged={this.props.passengerDetailsChanged}
        />
        <PassengerNote
          passengerDetails={this.props.passengerDetails}
          passengerDetailsChanged={this.props.passengerDetailsChanged}
        />
      </View>
    );
  }
}

/**
 * Apply the same theme for all passenger details text inputs.
 */
RkTheme.setType("RkTextInput", "passengerDetails", {
  input: {
    backgroundColor: "white",
    marginLeft: 5,
    marginHorizontal: 0,
    borderRadius: 5
  },
  color: "gray",
  borderRadius: 10,
  container: {
    paddingHorizontal: 10
  }
});
