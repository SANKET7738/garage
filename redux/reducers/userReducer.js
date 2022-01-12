import { USER_STATE_CHANGE } from '../constants';

const initialState = {
    // currentUser: null,
    currentUser: {
        'name': 'Sanket',
        'email' : 'sanket@test.com',
        'phoneNo' : '7738005469',
    }
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}