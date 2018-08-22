/**********************************************************
 * Copyright © 2018 HERE Global B.V. All rights reserved. *
 **********************************************************/

import React, { Component } from "react";
import { Text, View } from "react-native";
import SharedStyles from "../styles/shared";

/**
 * Present ride price.
 */
const Price = props => {
  const { estimatedPrice } = props;
  let priceStr = "N/A";
  if (estimatedPrice) {
    //Price can be fixed or range of prices.
    const { fixedPrice, priceRange } = estimatedPrice;
    if (fixedPrice) {
      const { amount, currencyCode } = fixedPrice;
      return amount + " " + currencyCode;
    } else {
      const { lowerBound, upperBound, currencyCode } = priceRange;
      priceStr = lowerBound + "-" + upperBound + " " + currencyCode;
    }
  }

  return (
    <View style={[{ flex: 0.5 }, SharedStyles.centerColumnContainer]}>
      <Text style={SharedStyles.estimationTextStyle}>{priceStr}</Text>
      <Text>Estimated Price</Text>
    </View>
  );
};

/**
 * Present ride ETA (Estimated Time of Arrival)
 */
const ETA = props => {
  const { estimatedTime } = props;
  let etaStr = "N/A";
  if (estimatedTime) {
    let time = new Date(estimatedTime);
    etaStr = time.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <View style={[{ flex: 0.5 }, SharedStyles.centerColumnContainer]}>
      <Text style={SharedStyles.estimationTextStyle}>{etaStr}</Text>
      <Text>ETA</Text>
    </View>
  );
};

type Props = {
  estimatedPrice: PriceEstimate,
  estimatedTime: string
};

/**
 * Present Ride Price and ETA Estimation.
 */
export class RideInfo extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[{ marginTop: 10 }, SharedStyles.centerRowContainer]}>
        <Price estimatedPrice={this.props.estimatedPrice} />
        <ETA estimatedTime={this.props.estimatedTime} />
      </View>
    );
  }
}
