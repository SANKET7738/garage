import { USER_STATE_CHANGE } from "../constants";

export const setUser = (value) => ({
    type: USER_STATE_CHANGE,
    payload: value
})