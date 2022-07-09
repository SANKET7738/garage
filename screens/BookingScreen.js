import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import FormButton from '../components/FormButton';
import VehicleIconSelector from '../components/VehicleIconSelector';
import axios from 'axios';

function BookingScreen(props) {
  const user = useSelector(state => state.userState.currentUser);
  const [ vehicleList , setVehicleList ] = useState();
  const [ selectedVehicle, setSelectedVehicle ] = useState();
  const [loading,setLoading] = useState(false);

  let vehicleArray = user.vehicle_list;
  let parkingSpaceInfo = props.route.params.listingInfo;
  let parkingSpaceImages = parkingSpaceInfo.images;

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function bookListing(data){
    setLoading(true)
    axios.post(
      'http://10.0.2.2:5000/makeBooking',
      data
    )
    .then((response) => {
      if(response.data.success){
        setLoading(false)
        props.navigation.navigate("Booked", {"listingInfo": parkingSpaceInfo, "selectedVehicle": selectedVehicle })
      }
    })
    .catch((error) => console.log(error.response.data))
  }

  let availableFrom = formatAMPM(new Date(parkingSpaceInfo.available_from))
  let availableTo = formatAMPM(new Date(parkingSpaceInfo.available_to))
  
  useEffect(() => {
    setVehicleList(user.vehicle_list);
  }, []);
    
  const vehicleIcons = vehicleArray.map((vehicle) => (
      <TouchableOpacity onPress={() => setSelectedVehicle(vehicle)}>
        <VehicleIconSelector props={vehicle} />
      </TouchableOpacity>
  ));

  if(loading) {
    <View style={styles.conatiner}>
        <ActivityIndicator />
    </View>
}
  
  return (
    <View style={styles.container}>
        <ScrollView horizontal={true} style={styles.imageArea}>
              {parkingSpaceImages && parkingSpaceImages.map((image,i) => (
                <Image 
                  key={i}
                  style={styles.image}
                  source={{ uri: image }}
                />
              ))}
          </ScrollView>
          <View style={styles.addressRow}>
            <View>
              <Ionicons name="location-sharp" size={40} color="#F50057" />
            </View>
            <View style={styles.addressRowTextArea}>
              <Text style={styles.addressRowText}>{parkingSpaceInfo.addressText}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent:"space-evenly", marginVertical: 20, alignItems: "center"}}>
            <Text style={{fontSize: 20, }}>Availability</Text>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", }}>
              <Text style={{ fontSize : 19, marginRight: 10, color: "#F50057", fontWeight: "bold"}}>{availableFrom}</Text>
              <Text style={{ fontSize: 19, marginLeft: 10, color: "#F50057", fontWeight: "bold"}}>{availableTo}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-evenly", marginVertical: 20, alignItems: "center"}}>
                <Text style={{fontSize: 20, marginLeft: -56}}>Rent Per Hour</Text>
                <Text style={{fontSize: 19,  color: "#F50057", fontWeight: "bold"}}>{parkingSpaceInfo.rent_per_hour}</Text>
          </View>
          
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold", marginLeft: 20, marginVertical: 5}}>Select vehicle</Text>
            <ScrollView horizontal={true}>
              {vehicleIcons}
            </ScrollView>
          </View>
          <View style={{marginTop: 5}}>
            <FormButton buttonTitle={"Book"} 
                  disabled={selectedVehicle ? false : true}
                  onPress={() => {
                      bookListing({
                        "uid": user.uid,
                        "listingInfo": parkingSpaceInfo,
                        "selectedVehicle": selectedVehicle,
                      })
                      // props.navigation.navigate("Booked", {"listingInfo": parkingSpaceInfo, "selectedVehicle": selectedVehicle })
                  }} 
            />
          </View>
    </View>
  )
}

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 220,
    margin: 5,
  },
  imageArea : {
    flexDirection: "row",
    width: Dimensions.get('window').width,
    maxHeight: 240,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  addressRowTextArea: {
    width: "70%",
  },
  addressRowText: {
    fontSize: 18,
  },
})