# HERE Mobility SDK - React Native Sample App

## Introduction

HERE Mobility offers a mobility platform solution to transportation service providers, businesses, and consumers. The platform consists of the HERE Mobility Marketplace and SDK packages.

The HERE Mobility Marketplace is a "broker" between transportation suppliers and consumers, which matches up ride requests with ride offers. The HERE Mobility SDK enables developers to create apps with a variety of mobility features, while connecting to the HERE Mobility Marketplace.

The Here Mobility sample app (described below) presents a simple workflow for adding a variety of mobility services to your app.

## Getting Started

### Getting Access Credentials

To use the HERE Mobility SDK, you'll need App ID key and App secret key values. To request these credentials, contact us at [mobility_developers@here.com]().

>**Note:** Please make sure to email us both a bundle ID and a package name, for your iOS and Android apps respectively.

### Cloning the Sample App Git Repository

In a Bash command window, clone the React Sample App Git repository as follows:

```bash
# Clone this repository
$ git clone https://github.com/HereMobilityDevelopers/Here-Mobility-SDK-React-Native-SampleApp.git 
```

### Running the React Sample App

#### Building React Dependencies

To build the React dependencies, first run the following command, and then run the appropriate commands for your OS (see below).

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

 |Step 
 |:----
 |[Get ride offers](#get-ride-offers) 
 |[Present ride offers according to type](#present-ride-offers-by-type)
 |[Book a ride](#book-a-ride)
 |[Register for ride updates](#register-for-ride-updates)
 |[Receive ride updates](#receive-ride-updates)
 |[Present public transport leg details](#present-public-transport-leg-details)

### Get Ride Offers

You can request ride offers based on parameters such as pickup time and location, number of passengers, etc. See the [RideOffersRequest documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#rideoffersrequest) to learn more.

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

### Present Ride Offers by Type

Ride offers can have 1 of 2 types: Taxi and Public Transportation.
See the following documentation to learn more:

* [Taxi ride offers documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#taxirideoffer)
* [Public transportation ride offers documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#publictransportrideoffer)

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

You can book one of the ride offers that you received in response to *getRideOffers*. To do this, call *createRide* while passing the passenger's details (see [PassengerDetails documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#passengerdetails) to learn more).

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

### Register for Ride Updates

You can register for updates about a ride's status and location. See  [registerForRidesUpdates Documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#heremobilitysdkdemandregisterforridesupdates) to learn more.

```js
HereMobilitySDKDemand.registerForRidesUpdates(
	(ride, rideStatusLog) => { // handle ride updates },
	(ride, rideLocation) => { // handle ride location updates },
	error => {}
);
```

### Present Public Transport Leg Details

A public transport ride is composed of one or more sections or "legs". Each leg may be provided by a different type of public transport. You can retrieve and display all the ride's legs. See [PublicTransportRouteLeg documentation](https://heremobilitydevelopers.github.io/Here-Mobility-Sdk-React-Native/#publictransportrouteleg) to learn more.

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
