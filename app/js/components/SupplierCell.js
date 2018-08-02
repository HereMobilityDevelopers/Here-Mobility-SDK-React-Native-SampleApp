/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import SharedStyles from "../styles/shared";

const BookingLabel = () => {
  return (
    <View style={SharedStyles.centerRowContainer}>
      <Image
        source={require("../../img/v.png")}
        style={{ width: 15, height: 15, margin: 5 }}
      />
      <Text style={{ color: "#06b87c", fontSize: 15, fontWeight: "bold" }}>
        BOOKED
      </Text>
    </View>
  );
};

const BookNowButton = () => {
  return (
    <TouchableOpacity>
      <Text style={SharedStyles.menuButton}>Book now</Text>
    </TouchableOpacity>
  );
};

/**
 * Get supplier Icon.
 */
const SupplierIcon = props => {
  if (props.supplier.logoUrl) {
    return (
      <Image
        source={{
          uri: props.supplier.logoUrl
        }}
        style={{ width: 40, height: 40 }}
      />
    );
  }
  return <View />;
};

type Props = {
  supplier: Supplier,
  booked: boolean
};

/**
 * Present supplier details.
 */
export class SupplierCell extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[SharedStyles.centerRowContainer, { padding: 20 }]}>
        <SupplierIcon supplier={this.props.supplier} />
        <Text style={SharedStyles.titleTextBold}>
          {this.props.supplier.localName}
        </Text>
        {this.props.booked ? <BookingLabel /> : <BookNowButton />}
      </View>
    );
  }
}
