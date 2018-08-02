/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/
import React from "react";
import { View } from "react-native";
import { DriverCell } from "../components/DriverCell";
import { RideInfo } from "../components/RideInfo";
import { SupplierCell } from "../components/SupplierCell";

export const RideDetails = props => {
  return (
    <View>
      {props.ride.supplier ? (
        <SupplierCell supplier={props.ride.supplier} booked />
      ) : null}
      <RideInfo
        estimatedTime={
          props.rideLocationUpdate
            ? props.rideLocationUpdate.estimatedDropOffTime
            : null
        }
        estimatedPrice={props.ride.bookingEstimatedPrice}
      />
      <DriverCell driver={props.ride.driver} />
    </View>
  );
};
