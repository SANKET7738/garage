import { combineReducers } from "redux";
import { user } from './userReducer';
import { address } from './parkingSpaceReducer';

const rootReducer = combineReducers({
    userState: user,
    addressState: address,
})

export default rootReducer