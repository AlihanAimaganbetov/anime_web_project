import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT  } from './authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                error: null
            };
        default:
            return state;
    }
};
