import {createReducer} from "./reducerUtils";
import {REGISTRATION_FAIL, REGISTRATION_REQUEST, REGISTRATION_SUCCESS} from "../actions/registration";

export const registration = createReducer({}, {

    [REGISTRATION_REQUEST]: () => {
        return {
            isRegistering: true,
            isRegistered: false
        }
    },

    [REGISTRATION_SUCCESS]: (state, payload) => {
        return {
            ...state,
            username: payload.username,
            email: payload.email,
            isRegistering: false,
            isRegistered: true
        }
    },

    [REGISTRATION_FAIL]: (state, payload) => {
        return {
            ...state,
            errors: payload.errors,
            globalError: payload.globalError,
            isRegistering: false,
            isRegistered: false
        }
    },
});