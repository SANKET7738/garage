import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
    return{
        type: USER_STATE_CHANGE,
        payload: currentUser
        
    }
}