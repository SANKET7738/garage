import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import FormButton from '../components/FormButton';
import VehicleIconSelector from '../components/VehicleIconSelector';

function BookingScreen(props) {
  const user = useSelector(state => state.userState.currentUser);
  const [ vehicleList , setVehicleList ] = useState();
  let vehicleArray = user.vehicle_list;
  let parkingSpaceInfo = props.route.params.listingInfo;
  let parkingSpaceImages = parkingSpaceInfo.images;

  let availableFrom = new Date(parkingSpaceInfo.available_from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0,5);
  let availableTo = new Date(parkingSpaceInfo.available_to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0,5);
  
  useEffect(() => {
    setVehicleList(user.vehicle_list);
  }, []);

  console.log(vehicleArray);

  const vehicleIcons = vehicleArray.map((vehicle) => (
      <VehicleIconSelector props={vehicle} />
  ));
  
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
                <Text style={{fontSize: 20, marginLeft: -26}}>Rent Per Hour</Text>
                <Text style={{fontSize: 19,  color: "#F50057", fontWeight: "bold"}}>{parkingSpaceInfo.rent_per_hour}</Text>
          </View>
          {/* <View style={{ flexDirection: "row"}}>
                {vehicleIcons}
          </View> */}
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold", marginLeft: 20, marginVertical: 5}}>Select vehicle</Text>
            <ScrollView horizontal={true}>
              {vehicleIcons}
            </ScrollView>
          </View>
          <View style={{marginTop: 5}}>
            <FormButton buttonTitle={"Book"} 
                  onPress={() => {
                      updateCarDetails(addCarDetails);
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