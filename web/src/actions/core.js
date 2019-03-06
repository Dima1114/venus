import $ from 'jquery'

export const GET_ENTITY_LIST_REQUEST = 'GET_ENTITY_LIST_REQUEST';
export const GET_ENTITY_LIST_SUCCESS = 'GET_ENTITY_LIST_SUCCESS';
export const GET_ENTITY_LIST_FAIL = 'GET_ENTITY_LIST_FAIL';

export function getEntityListAll(store, entities, paramName) {
    return function (dispatch) {
        dispatch(getEntityListRequest(store));
        $.ajax({
            type: 'GET',
            url: '/' + entities,
            contentType: 'application/json',
        }).then(response => {
            dispatch(getEntityListSuccess(store, response._embedded[paramName || entities]))
        }).catch(error => {
            const message = error.responseJSON || error.responseText;
            dispatch(getEntityListFail(store, message))
        })
    }
}

export function getEntityListRequest(store) {
    return {
        type: GET_ENTITY_LIST_REQUEST,
        payload: {
            store: store
        }

    }
}

export function getEntityListSuccess(store, payload) {
    return {
        type: GET_ENTITY_LIST_SUCCESS,
        payload: {
            store: store,
            list: payload
        }
    }
}

export function getEntityListFail(store, payload) {
    return {
        type: GET_ENTITY_LIST_FAIL,
        payload: {
            store: store,
            errors: payload
        }
    }
}