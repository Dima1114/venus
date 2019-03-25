import $ from "jquery";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export function forgotPassword(username) {
    return function (dispatch) {
        dispatch(forgotRequest());
        $.ajax({
            type: 'POST',
            url: '/auth/forgot',
            contentType: 'application/json',
            data: JSON.stringify({username: username})
        }).then(response => {
            dispatch(forgotSuccess(response))
        }).catch(error => {
            dispatch(forgotFail(error))
        })
    }
}

export function forgotRequest() {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
}

export function forgotSuccess() {
    return {
        type: FORGOT_PASSWORD_SUCCESS
    }
}

export function forgotFail(payload) {
    return {
        type: FORGOT_PASSWORD_FAIL,
        payload: {
            errors: payload.responseJSON.errors,
            globalError: !payload.responseJSON.errors ? payload.responseJSON.message : null
        }
    }
}