import $ from "jquery";


export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL';

export function registration(username, password, email) {
    return function (dispatch) {
        dispatch(registrationRequest());
        $.ajax({
            type: 'POST',
            url: 'auth/registration',
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