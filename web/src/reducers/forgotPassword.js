import {createReducer} from "./reducerUtils";
import {FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS} from "../actions/forgotPassword";

export const forgotReducer = createReducer({}, {

    [FORGOT_PASSWORD_REQUEST]: (state) => {
        return {
            ...state,
            await: true,
            sent: false,
            errors: null,
            globalError: null,
        }
    },
    [FORGOT_PASSWORD_SUCCESS]: (state) => {
        return {
            ...state,
            await: false,
            sent: true,
            errors: null,
            globalError: null,
        }
    },
    [FORGOT_PASSWORD_FAIL]: (state, payload) => {
        return {
            ...state,
            await: false,
            sent: false,
            errors: payload.errors,
            globalError: payload.globalError
        }
    }
});