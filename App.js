import React, {Component} from 'react';
import MainView from "./app/js/screens/MainView";
import {createStackNavigator} from "react-navigation";
import GetOffersView from './app/js/screens/GetOffersView';
import OffersListView from './app/js/screens/OffersListView';
import RideDetailsView from './app/js/screens/RideDetailsView';
import PublicTransportView from './app/js/screens/PublicTransportView';
import RidesListView from './app/js/screens/RidesListView';
import UserRegistration from './app/js/screens/UserRegistration';


const RootStack = createStackNavigator({
    MainView: {
        screen: MainView,
    },
    GetOffers: {
        screen: GetOffersView,
    },
    OffersList: {
        screen: OffersListView,
    },
    RideDetails: {
        screen: RideDetailsView,
    },
    PublicTransportDetails: {
        screen: PublicTransportView
    },
    MyRides: {
        screen: RidesListView
    },
    UserRegistration: {
        screen: UserRegistration
    }
}, {
    initialRouteName: 'MainView',
});


export default class App extends Component {


    render() {
        return (<RootStack/>)
    }
}
