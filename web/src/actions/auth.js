import $ from 'jquery'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';

export function login(username, password) {
    return function (dispatch) {
        dispatch(loginRequest());
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => {
            dispatch(loginSuccess(response))
        }).catch(error => {
            dispatch(loginFail(error))
        })
    }
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

export function loginSuccess(payload) {
    localStorage.setItem('refreshToken', payload.refreshToken);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
        }
    }
}

export function loginFail(payload) {
    localStorage.removeItem('refreshToken');
    return {
        type: LOGIN_FAIL,
        payload: {
            errors: payload.responseJSON.errors,
            globalError: !payload.responseJSON.errors ? payload.responseJSON.message : null
        }
    }
}

export function refreshToken(token) {
    return function (dispatch) {
        dispatch(refreshTokenRequest());
        $.ajax({
            type: 'POST',
            url: '/auth/token',
            contentType: 'application/json',
            headers: {"X-Auth": "Bearer " + token}
        }).then(response => {
            dispatch(refreshTokenSuccess(response))
        }).catch(error => {
            dispatch(refreshTokenFail(error))
        })
    }
}

export function refreshTokenRequest() {
    return {
        type: REFRESH_TOKEN_REQUEST
    }
}

export function refreshTokenSuccess(payload) {
    localStorage.setItem('refreshToken', payload.refreshToken);
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
        }
    }
}

export function refreshTokenFail(payload) {
    localStorage.removeItem('refreshToken');
    return {
        type: REFRESH_TOKEN_FAIL,
        payload: {
            errors: payload.responseJSON.errors,
            globalError: !payload.responseJSON.errors ? payload.responseJSON.message : null,
        }
    }
}

export function logoutAndRedirect() {
    return (dispatch) => {
        return $.ajax({
            type: 'GET',
            url: '/auth/logout',
            dataType: 'json',
        })
            .then(function () {
                dispatch(logout())
            })
            .catch(error => {

            })
    }
}

export function logout() {
    localStorage.removeItem('refreshToken');
    window.location.reload();
    return {
        type: LOGOUT_USER
    }
}

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';
export const COMPLETE_REGISTRATION_REQUEST = 'COMPLETE_REGISTRATION_REQUEST';
export const COMPLETE_REGISTRATION_SUCCESS = 'COMPLETE_REGISTRATION_SUCCESS';
export const COMPLETE_REGISTRATION_FAIL = 'COMPLETE_REGISTRATION_FAIL';

export function registration(username, password, email) {
    return function (dispatch) {
        dispatch(registrationRequest());
        $.ajax({
            type: 'POST',
            url: '/auth/registration',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }).then(response => {
            dispatch(registrationSuccess(response))
        }).catch(error => {
            dispatch(registrationFail(error))
        })
    }
}

export function registrationRequest() {
    return {
        type: REGISTRATION_REQUEST
    }
}

export function registrationSuccess(payload) {
    return {
        type: REGISTRATION_SUCCESS,
        payload: {
            email: payload.email,
            username: payload.username,
        }
    }
}

export function registrationFail(payload) {
    return {
        type: REGISTRATION_FAIL,
        payload: {
            errors: payload.responseJSON.errors,
            globalError: !payload.responseJSON.errors ? payload.responseJSON.message : null
        }
    }
}

export function completeRegistration(token) {
    return function (dispatch) {
        dispatch(completeRegistrationRequest());
        $.ajax({
            type: 'GET',
            url: '/auth/registration?token=' + token,
            contentType: 'application/json',
        }).then(response => {
            dispatch(completeRegistrationSuccess(response))
        }).catch(error => {
            dispatch(completeRegistrationFail(error))
        })
    }
}

export function completeRegistrationRequest() {
    return {
        type: COMPLETE_REGISTRATION_REQUEST
    }
}

export function completeRegistrationSuccess(payload) {
    return {
        type: COMPLETE_REGISTRATION_SUCCESS,
        payload: {
            refreshToken: payload.refreshToken
        }
    }
}

export function completeRegistrationFail(payload) {
    return {
        type: COMPLETE_REGISTRATION_FAIL,
        payload: {
            errors: payload.responseJSON.errors,
            globalError: !payload.responseJSON.errors ? payload.responseJSON.message : null
        }
    }
}