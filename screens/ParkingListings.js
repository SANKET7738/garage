import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'; 
import ListingCard from '../components/ListingCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ParkingListings({navigation}) {
    const user = useSelector(state => state.userState.currentUser)
    const [ parkingSpaces, setParkingSpaces ] = useState()
    const [ loading, setLoading ] = useState(true)

    const getParkingSpaces = (uid) => {
        axios.post(
            'http://10.0.2.2:5000/getAllParkingSpaces',
            {"uid": uid}
        )
        .then((response) => {
            console.log(response.data)
            setParkingSpaces(response.data.parking_spaces_list)
            setLoading(false)
        })
        .catch((error) => console.log(error) )
    }

    useEffect(() => {
        getParkingSpaces(user.uid)
    },[]);

    if(parkingSpaces){
        console.log(parkingSpaces)
    }

    
    if (loading) {
        return (
            <View style={styles.container}> 
                <ActivityIndicator size="large" color="#F50057"/>
            </View>
        )
    }    
    
  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>My Parking Spaces</Text>
          </View>
          <View style={styles.listings}>
              {parkingSpaces && parkingSpaces.map(parkingSpace =>  (
                  <ListingCard navigation={navigation} parkingSpace={parkingSpace}/>
              ))}
          </View>
      </View>
  )
}

export default ParkingListings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    listings: {
        alignItems: "center"
    }
})