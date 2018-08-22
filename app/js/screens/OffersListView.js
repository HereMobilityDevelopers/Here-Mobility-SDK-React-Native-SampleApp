/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { View, ListView, TouchableOpacity, Text, Button } from "react-native";
import { RkCard } from "react-native-ui-kitten";
import { RideInfo } from "../components/RideInfo";
import { SupplierCell } from "../components/SupplierCell";
import SharedStyles from "../styles/shared";
import { NavigationActions, StackActions } from "react-navigation";

/**
 * Here Mobility Demand SDK wrapper.
 */
const { HereMobilitySDKDemand } = require("react-native-here-mobility-sdk");

/**
 * Display list of ride offers for the user to choose from.
 */
export default class OffersListView extends Component {
  /**
   * Screen navigation title.
   */
  static navigationOptions = {
    title: "Offers List"
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const { offers } = this.props.navigation.state.params;

    this.state = {
      dataSource: ds.cloneWithRows(offers.all())
    };
  }

  render() {
    return (
      <View style={SharedStyles.screenContainer}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={rowData => this.getRow(rowData)}
        />
      </View>
    );
  }

  getRow(offer) {
    return (
      <OfferCell
        offer={offer}
        onPress={offer => {
          this.onCellPressed(offer);
        }}
      />
    );
  }

  /**
   * Called when an offer cell is pressed.
   */
  onCellPressed = function(offer) {
    switch (offer.type) {
      case "TAXI":
        const {
          passengerDetails,
          subscribeToMessages
        } = this.props.navigation.state.params;
        createRide(
          offer,
          passengerDetails,
          subscribeToMessages,
          this.props.navigation
        );
        break;
      case "PUBLIC_TRANSPORT":
        this.props.navigation.navigate("PublicTransportDetails", {
          offer: offer
        });
        break;
    }
  };
}

/**
 * Request to book a Ride Offer received from a HereSDKDemand.getRides() request.
 */
const createRide = (
  offer,
  passengerDetails,
  subscribeToMessages,
  navigation
) => {
  HereMobilitySDKDemand.createRide(
    offer.offerId,
    passengerDetails,
    subscribeToMessages,
    (ride, error) => {
      if (error) {
        alert(error);
      } else {
        navigateToRideDetails(ride, navigation);
      }
    }
  );
};

/**
 * Navigate to ride details. Remove OffersListView from navigation stack view because this view is irrelevant.
 */
const navigateToRideDetails = (ride, navigation) => {
  const resetAction = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: "MainView" }),
      NavigationActions.navigate({
        routeName: "RideDetails",
        params: { ride: ride }
      })
    ]
  });
  navigation.dispatch(resetAction);
};

/**
 * Taxi offer cell.
 */
const TaxiOfferCell = props => {
  return (
    <View>
      <SupplierCell supplier={props.taxiOffer.supplier} />
      <RideInfo
        estimatedPrice={props.taxiOffer.estimatedPrice}
        estimatedTime={props.taxiOffer.estimatedPickupTime}
      />
    </View>
  );
};

/**
 * Public transport cell.
 */
const PublicTransportCell = props => {
  return (
    <View style={SharedStyles.centerRowContainerWithStandardMargin}>
      <View style={{ flex: 1 }}>
        <Text style={SharedStyles.titleTextBold}>
          {props.publicTransportOffer.type}
        </Text>
        <Text style={SharedStyles.margin10}>
          Transfers number: {props.publicTransportOffer.transfers}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={SharedStyles.menuButton}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * A component to present an offer cell.
 * Can be a Taxi offer or a Public transport offer.
 */
class OfferCell extends Component {
  render() {
    const { offer } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(offer)}>
        <RkCard rkType="shadowed" style={{ flex: 1, margin: 10, padding: 10 }}>
          {offer.type === "TAXI" ? (
            <TaxiOfferCell taxiOffer={offer} />
          ) : (
            <PublicTransportCell publicTransportOffer={offer} />
          )}
        </RkCard>
      </TouchableOpacity>
    );
  }
}
