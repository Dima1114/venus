import {createReducer} from "./reducerUtils";
import jwtDecode from 'jwt-decode';
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REFRESH_TOKEN_FAIL, REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS
} from "../actions/auth";

const initState = {
    isAuthenticating: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    username: null,
    expTime: null,
    errors: null,
    globalError: null
};

export const authReducer = createReducer(initState, {

    [LOGIN_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isAuthenticating: true,
            isAuthenticated: false
        });
    },
    [LOGIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            username: jwtDecode(payload.accessToken).username,
            expTime: jwtDecode(payload.accessToken).exp,
            isAuthenticating: false,
            isAuthenticated: true,
            errors: null,
            globalError: null
        });
    },
    [LOGIN_FAIL]: (state, payload) => {
        return Object.assign({}, state, {
            errors: payload.errors,
            globalError: payload.globalError,
            isAuthenticating: false,
            isAuthenticated: false
        });
    },
    [REFRESH_TOKEN_REQUEST]: (state) => {
        return Object.assign({}, state, {
            isAuthenticating: true
        });
    },
    [REFRESH_TOKEN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            username: jwtDecode(payload.accessToken).username,
            expTime: jwtDecode(payload.accessToken).exp,
            isAuthenticating: false,
            isAuthenticated: true,
            errors: null,
            globalError: null
        });
    },
    [REFRESH_TOKEN_FAIL]: (state, payload) => {
        return Object.assign({}, state, {
            errors: payload.errors,
            globalError: payload.globalError,
            isAuthenticating: false,
            isAuthenticated: false
        });
    },
    [LOGOUT_USER]: (state) => {
        return Object.assign({}, state, initState);
    },


});