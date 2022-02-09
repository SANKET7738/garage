import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParkingListings from "../screens/ParkingListings";
import ListingInfoScreen from "../screens/ListingInfoScreen";
import ListingCard from "../components/ListingCard";

const Stack = createNativeStackNavigator();

const ListingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Parking Listing" component={ParkingListings} options={{headerShown: false}} />
            <Stack.Screen name="View Details" component={ListingInfoScreen} />
        </Stack.Navigator>
    )
}

export default ListingStack;