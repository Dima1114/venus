import {createReducer} from "./reducerUtils";
import {GET_ENTITY_LIST_REQUEST, GET_ENTITY_LIST_SUCCESS, GET_ENTITY_LIST_FAIL} from "../actions/core";

export const coreReducer = createReducer({}, {

    [GET_ENTITY_LIST_REQUEST]: (state, payload) => {
        return {
            ...state,
            [payload.storeName]: {
                loading: true,
                loaded: false,
                list: null,
                errors: null,
            }
        }
    },
    [GET_ENTITY_LIST_SUCCESS]: (state, payload) => {
        return {
            ...state,
            [payload.storeName]: {
                list: payload.list,
                errors: null,
                loading: false,
                loaded: true
            }
        }
    },
    [GET_ENTITY_LIST_FAIL]: (state, payload) => {
        return {
            ...state,
            [payload.storeName]: {
                list: null,
                errors: payload.errors,
                loading: false,
                loaded: false
            }
        }
    }
});