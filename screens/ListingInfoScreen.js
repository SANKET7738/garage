import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements/dist/buttons/Button';
import axios from 'axios';

function ListingInfoScreen({ route,navigation}) {
  let parkingSpaceInfo = route.params.parkingSpace;
  let parkingSpaceImages = parkingSpaceInfo.images;
  const [dateBefore, setDateBefore] = useState(new Date());
  const [dateAfter, setDateAfter] = useState(new Date());
  const [showBefore, setShowBefore] = useState(false);
  const [showAfter,setShowAfter] = useState(false);
  const [ rent, setRent ] = useState(0);
  const [ spots, setSpots ] = useState(1);

  const showBeforeTimepicker = () => {
    setShowBefore(true);
  }

  const showAfterTimepicker = () => {
    setShowAfter(true);
  }

  const onChangeBefore = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateBefore(currentDate);
    setShowBefore(false);
  }

  const onChangeAfter = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateAfter(currentDate);
    setShowAfter(false);
  }

  const setListingActive = () => {
    let payload = {
      "pid" : parkingSpaceInfo.pid,
      "parking_spots": spots,
      "rent_per_hour": rent,
      "available_from": dateBefore,
      "available_to": dateAfter,
    }
    axios.post(
      'http://10.0.2.2:5000/markParkingSpaceActive',
      payload
    )
    .then((response) => {
      console.log(response.data)
      navigation.navigate("Parking Listing")
    })
    .catch((error) => console.log(error))
  }  
  return  (
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
          <View style={styles.timeDisplay}>
            <View>
              <Text style={styles.timeDisplayText}>Availability</Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <View style={styles.clock}> 
                  <TouchableOpacity style={{flexDirection: "row"}} onPress={showBeforeTimepicker}>
                    <View style={{backgroundColor: "#F50057", padding: 4, margin: 2}}>
                      <Text style={{fontSize: 19, color: "white"}}>{dateBefore.getHours()}</Text>
                    </View>
                    <View style={{backgroundColor: "#F50057", padding: 4, margin: 2}}>
                      <Text style={{fontSize: 19, color: "white"}}>{dateBefore.getMinutes()}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
              <View style={styles.clock}> 
                  <TouchableOpacity style={{flexDirection: "row"}} onPress={showAfterTimepicker}>
                    <View style={{backgroundColor: "#F50057", padding: 4, margin: 2}}>
                      <Text style={{fontSize: 19, color: "white"}}>{dateAfter.getHours()}</Text>
                    </View>
                    <View style={{backgroundColor: "#F50057", padding: 4, margin: 2}}>
                      <Text style={{fontSize: 19, color: "white"}}>{dateAfter.getMinutes()}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            {showBefore && ( 
              <DateTimePicker   
                testID="dateTimepicker"
                value={dateBefore}
                mode={'time'}
                display="default"
                onChange={onChangeBefore}
              />
            )}
             {showAfter && ( 
              <DateTimePicker   
                testID="dateTimepicker"
                value={dateAfter}
                mode={'time'}
                display="default"
                onChange={onChangeAfter}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10, alignItems: "center"}}>
            <Text style={{fontSize: 18, marginLeft: -95}}>Rent Per Hour</Text>
            <TextInput defaultValue={rent} onChangeText={(e) => setRent(e)}keyboardType="number-pad" style={{ width: 50, marginHorizontal: 20, borderBottomColor: "#F50057", borderBottomWidth: 1}}/>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10, alignItems:"center"}}>
            <Text style={{fontSize: 18, marginLeft: -45}}>No of Vehicle Spots</Text>
            <TextInput onChangeText={(e) => setSpots(e)} keyboardType="number-pad"  defaultValue={spots} style={{ width: 50, marginHorizontal: 20, borderBottomColor: "#F50057", borderBottomWidth: 1}}/>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end", bottom: 10, alignSelf:"center"}}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                setListingActive()
              }}
            >
              <Text style={styles.buttonText}>Make Active</Text>
            </TouchableOpacity>
          </View>
      </View>
  )
}

export default ListingInfoScreen;

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
  timeDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  clock: {
    flexDirection: "row",
    marginLeft: 30,
  },
  timeDisplayText: {
    fontSize: 20,
  },
  button :{
    margin: 10,
    paddingVertical: 15,
    width: 250,
    backgroundColor: "#F50057",
    alignItems: "center",
    borderRadius: 10
},
buttonText :{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
},
})