import { PARKING_SPACE_STATE_CHANGE } from "../constants";
import { PARKING_SPACE_UPDATE_COORDS } from "../constants";
import { PARKING_SPACE_UPDATE_ADDRESS_TEXT } from "../constants";
import { PARKING_SPACE_UPDATE_OWNERSHIP_TYPE } from "../constants";
import { PARKING_SPACE_UPDATE_LANDMARK } from "../constants";
import { PARKING_SPACE_UPDATE_COMPLETE_ADDRESS } from "../constants";
import { PARKING_SPACE_UPDATE_IMAGES} from '../constants';

const initialAddress = {
    coords: null,
    addressText: null,
    completeAddress: null,
    landMark: null,
    ownershipType: null,
    images: null,
}

export const address = (state = initialAddress, action) => {
    switch(action.type) {
        case PARKING_SPACE_STATE_CHANGE:
            return {
                ...state,
                currentAddress: action.payload
            };
        case PARKING_SPACE_UPDATE_COORDS:
            return {
                ...state,
                coords: action.payload
            };
        case PARKING_SPACE_UPDATE_ADDRESS_TEXT:
            return {
                ...state,
                addressText: action.payload,
            }
        case PARKING_SPACE_UPDATE_OWNERSHIP_TYPE:
            return {
                ...state,
                ownershipType: action.payload,
            }
        case PARKING_SPACE_UPDATE_COMPLETE_ADDRESS:
            return {
                ...state,
                completeAddress: action.payload,
            }
        case PARKING_SPACE_UPDATE_LANDMARK:
            return {
                ...state,
                landMark: action.payload
            }
        case PARKING_SPACE_UPDATE_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        default: 
            return state;
    }
}