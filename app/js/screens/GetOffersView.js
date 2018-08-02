/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { ScrollView, Text, View, TouchableHighlight } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import SharedStyles from "../styles/shared";
import { WayPointCell } from "../components/WayPointCell";
import { PassengerDetails } from "../components/PassengerDetails";
import { BookingDetails } from "../components/BookingDetails";

/**
 * Here mobility SDK demand wrapper.
 */
const { HereMobilitySDKDemand } = require("react-native-here-mobility-sdk");

const GetOffersButton = props => {
  return (
    <View style={SharedStyles.buttonsContainer}>
      <TouchableHighlight
        style={SharedStyles.menuButton}
        onPress={props.onPress}
      >
        <Text style={SharedStyles.menuButtonText}>GET OFFERS</Text>
      </TouchableHighlight>
    </View>
  );
};

export default class GetOffersView extends Component {
  /**
   * Screen navigation title.
   */
  static navigationOptions = {
    title: "Get Offers"
  };

  constructor(props) {
    super(props);
    this.state = {
      //Center of london
      pickupPoint: {
        lat: "51.5",
        lon: "-0.115057"
      },
      destinationPoint: {
        lat: "51.6",
        lon: "-0.115057"
      },
      passengerDetails: {
        name: "Driver",
        phoneNumber: "0005565533",
        passengerNote: ""
      },
      bookingDetails: {
        bookingConstraints: {
          passengerCount: 1,
          passengerSuitcase: 0
        },
        //leave time, null if leave now.
        leaveTime: null,
        isTimePickerVisible: false,
        bookingNowSwitcher: true
      }
    };
  }

  render() {
    return (
      <View style={SharedStyles.screenContainer}>
        <ScrollView>
          <View style={{ flex: 1, margin: 10 }}>
            <WayPointCell
              title="Enter source location:"
              point={this.state.pickupPoint}
              pointChanged={point => {
                this.setState({ pickupPoint: point });
              }}
            />
            <WayPointCell
              title="Enter destination location:"
              point={this.state.destinationPoint}
              pointChanged={point => {
                this.setState({ destinationPoint: point });
              }}
            />
            <PassengerDetails
              passengerDetails={this.state.passengerDetails}
              passengerDetailsChanged={passengerDetails => {
                this.setState(passengerDetails);
              }}
            />
            <BookingDetails
              bookingDetails={this.state.bookingDetails}
              bookingDetailsChanged={bookingDetails => {
                this.setState({ bookingDetails: bookingDetails });
              }}
            />
          </View>
        </ScrollView>
        <GetOffersButton onPress={this.onGetRidePressed} />
        <DateTimePicker
          isVisible={this.state.bookingDetails.isTimePickerVisible}
          mode="time"
          is24Hour
          onConfirm={this.handleDatePicked}
          onCancel={this.dateTimePickerCancelPressed}
        />
      </View>
    );
  }

  /**
   * Called when get rides button pressed.
   * Send request to get rides offers.
   */
  onGetRidePressed = () => {
    //Name and phone number are mandatory to create ride.
    if (
      !this.state.passengerDetails.phoneNumber ||
      !this.state.passengerDetails.name
    ) {
      return alert("Please fill in all mandatory fields");
    }

    HereMobilitySDKDemand.getRideOffers(
      {
        constraints: {
          passengerCount: this.state.bookingDetails.bookingConstraints
            .passengerCount,
          passengerSuitcase: this.state.bookingDetails.bookingConstraints
            .passengerSuitcase
        },
        rideWaypoints: {
          pickup: {
            location: {
              lat: Number(this.state.pickupPoint.lat),
              lng: Number(this.state.pickupPoint.lon)
            }
          },
          destination: {
            location: {
              lat: Number(this.state.destinationPoint.lat),
              lng: Number(this.state.destinationPoint.lon)
            }
          }
        },
        passengerNote: this.state.passengerDetails.passengerNote,
        prebookPickupTime: this.state.bookingDetails.bookingConstraints
          .leaveTime,
        sortType: "BY_ETA" // Default value. Sort offers by ETA to the pickup point or BY_PRICE sort offers by price.
      },
      (offers, err) => {
        if (err) {
          alert(err);
        } else {
          this.props.navigation.navigate("OffersList", {
            offers: offers,
            passengerDetails: this.state.passengerDetails
          });
        }
      }
    );
  };

  /**
   * Called when date time picker view cancel buttn pressed.
   */
  dateTimePickerCancelPressed = () => {
    this.setState({
      bookingDetails: {
        ...this.state.bookingDetails,
        bookingNowSwitcher: true,
        isTimePickerVisible: false,
        leaveTime: null
      }
    });
  };

  /**
   * Handle date picker time selected.
   * The minimum time for pre-book offers is NOW() + 30 minutes.
   */
  handleDatePicked = leavingTime => {
    const minimumTimeForBooking = new Date(new Date().getTime() + 30 * 60);

    if (minimumTimeForBooking <= leavingTime) {
      this.setState({
        bookingDetails: {
          ...this.state.bookingDetails,
          leaveTime: leavingTime,
          isTimePickerVisible: false
        }
      });
    } else {
      this.setState({
        bookingDetails: {
          ...this.state.bookingDetails,
          leaveTime: null
        }
      });
      alert("Must be at least 30 minutes from now.");
    }
  };
}
