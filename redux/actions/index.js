import { USER_STATE_CHANGE } from "../constants";
import { PARKING_SPACE_STATE_CHANGE } from "../constants";
import { PARKING_SPACE_UPDATE_COORDS } from "../constants";
import { PARKING_SPACE_UPDATE_ADDRESS_TEXT } from "../constants";
import { PARKING_SPACE_UPDATE_OWNERSHIP_TYPE } from "../constants";
import { PARKING_SPACE_UPDATE_COMPLETE_ADDRESS } from "../constants";
import { PARKING_SPACE_UPDATE_LANDMARK } from "../constants";
import { PARKING_SPACE_UPDATE_IMAGES } from "../constants";

export const setUser = (value) => ({
    type: USER_STATE_CHANGE,
    payload: value
})

export const setAddress = (value) => ({
    type: PARKING_SPACE_STATE_CHANGE,
    payload: value
})

export const parkingSpaceUpdateCoords = (coords) => ({
    // coords : {
    //     latitude: something,
    //     longitude: something,
    // }
    type: PARKING_SPACE_UPDATE_COORDS,
    payload: coords
})

export const parkingSpaceUpdateAddressText = (addressText) => ({
    type: PARKING_SPACE_UPDATE_ADDRESS_TEXT,
    payload: addressText
})

export const parkingSpaceUpdateOwnershipType = (ownershipType) => ({
    type: PARKING_SPACE_UPDATE_OWNERSHIP_TYPE,
    payload: ownershipType,
})

export const parkingSpaceUpdateCompleteAddress = (address) => ({
    type: PARKING_SPACE_UPDATE_COMPLETE_ADDRESS,
    payload: address,
})

export const parkingSpaceUpdateLandmark = (landmark) => ({
    type: PARKING_SPACE_UPDATE_LANDMARK,
    payload: landmark,
})

export const parkingSpaceUpdateImages = (imageArray) => ({
    type: PARKING_SPACE_UPDATE_IMAGES,
    payload: imageArray,
})