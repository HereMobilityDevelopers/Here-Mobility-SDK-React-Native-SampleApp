# HERE Mobility SDK - React Native Sample App

## Introduction

HERE Mobility offers a mobility platform solution to transportation service providers, businesses, and consumers. The platform consists of the HERE Mobility Marketplace and SDK packages.

The HERE Mobility Marketplace is a "broker" between transportation suppliers and consumers, which matches up ride requests with ride offers. The HERE Mobility SDK enables developers to create apps with a variety of mobility features, while connecting to the HERE Mobility Marketplace.

The Here Mobility sample app (described below) presents a simple workflow for adding a variety of mobility services to your app.


## Getting Started

### Getting Access Credentials

To use the HERE Mobility SDK, you'll need App ID key and App secret key values. To request these credentials, contact us at [mobility_developers@here.com]().

Please make sure to email us both bundle id/package name for your IOS and Android apps

### Cloning the Sample App Git Repository

In a Bash command window, clone the React Sample App Git repository as follows:

```bash
# Clone this repository
$ // TO UPDATE
```

### Running React sample app

#### Build React dependencies
```bash
$ npm install
```

#### iOS
```bash
# Build iOS dependencies
$ yarn build:ios
# run iOS
$ yarn run ios

```

#### Android 
```bash
# run android
$ yarn run android
```

## The Sample App

Here is an overview of the workflow for booking a ride and monitoring its progress, using the HERE Mobility SDK.
Click on a step name to go to its corresponding code example.

 |Step | Description
 |:----|:------------
 |[Get ride offers based on a ride request data](#get-ride-offers-based-on-a-ride-request-data) | Get ride offers from public or private ride suppliers
 |[Present ride offers according to type](#present-ride-offers-according-to-type)| Display public transport and/or ride suppliers
 |[Book a ride](#book-a-ride)| Book one of the ride offers received
 |[Register for ride updates](#register-for-ride-updates) | Register for updates about the ride's progress
 |[Receive ride updates](#receive-ride-updates) | receive updates for ride progress
 |[Present public transport details](#present-public-transport-details) | receive updates for ride progress


### Get Ride Offers

The HERE SDK Demand Kit allows you to request ride offers based on various parameters.

####Get ride offers based on a ride request data

```js
HereMobilitySDKDemand.getRideOffers(
      {
        constraints: {
          passengerCount: bookingConstraints.passengerCount,
          passengerSuitcase: bookingConstraints.passengerSuitcase
        },
        rideWaypoints: {
          pickup: {
            location: {
              lat: Number(pickupPoint.lat),
              lng: Number(pickupPoint.lon)
            }
          },
          destination: {
            location: {
              lat: Number(destinationPoint.lat),
              lng: Number(destinationPoint.lon)
            }
          }
        },
        passengerNote: passengerDetails.passengerNote,
        prebookPickupTime: bookingConstraints.leaveTime,
        sortType: "BY_ETA" // Default value. Sort offers by ETA to the pickup point or BY_PRICE sort offers by price.
      },
      (offers, err) => {
        if (err) {
          // handle error
        } else {
  			// handle offers
        }
      }
    );
```


#### Present ride offers according to type
```js
class OfferCell extends Component {
  render() {
    const { offer } = this.props;
    return (
      {offer.type === "TAXI" ? (
        <TaxiOfferCell taxiOffer={offer} />
      ) : (
        <PublicTransportCell publicTransportOffer={offer} />
      )}
    );
  }
}
```

### Book a Ride

Get passenger details

```js
type Props = {
  passengerDetails: {
    name: string,
    phoneNumber: string,
    passengerNote: string
  },
  passengerDetailsChanged: passengerDetails => void
};
```

#### Book a ride based on a ride offer and passenger details

```js
const createRide = (offer, passengerDetails) => {
  HereMobilitySDKDemand.createRide(
    offer.offerId,
    passengerDetails,
    (ride, error) => {
      if (error) {
			// handle error
      } else {
			// handle booked ride      }
    }
  );
};
```

#### register and receive ride updates according to your ride

```js
HereMobilitySDKDemand.registerForRidesUpdates(
	(ride, rideStatusLog) => { // handle ride updates },
	(ride, rideLocation) => { // handle ride location updates },
	error => {}
);
```

### Present public transport details

```js
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

```


## Support

To get help with the HERE Mobility SDK, contact our support team at [mobility_support_internal@here.com](mailto:mobility_support_internal@here.com)

## Licence

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
