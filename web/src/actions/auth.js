import $ from 'jquery'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';

export function login(baseUrl, username, password) {
    return function (dispatch) {
        dispatch(loginRequest());
        $.ajax({
            type: 'POST',
            url: baseUrl + '/auth/login',
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

export function refreshToken(baseUrl, token) {
    return function (dispatch) {
        $.ajax({
            type: 'POST',
            url: baseUrl + '/auth/token',
            contentType: 'application/json',
            data: JSON.stringify({refreshToken: token})
        }).then(response => {
            dispatch(refreshTokenSuccess(response))
        }).catch(error => {
            dispatch(refreshTokenFail(error))
        })
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

export function logoutAndRedirect(baseUrl) {
    return (dispatch) => {
        return $.ajax({
            type: 'GET',
            url: baseUrl + '/auth/logout',
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