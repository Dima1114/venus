import $ from 'jquery'
import {formRequestProps} from "../utils/formRequestProps";

export const GET_ENTITY_LIST_REQUEST = 'GET_ENTITY_LIST_REQUEST';
export const GET_ENTITY_LIST_SUCCESS = 'GET_ENTITY_LIST_SUCCESS';
export const GET_ENTITY_LIST_FAIL = 'GET_ENTITY_LIST_FAIL';

export function getEntityList(store, entities, paramName, params) {
    return function (dispatch) {
        dispatch(getEntityListRequest(store));
        $.ajax({
            type: 'GET',
            url: '/' + entities + formRequestProps(params),
            contentType: 'application/json',
        }).then(response => {
            dispatch(getEntityListSuccess(store, response._embedded[paramName || entities]))
        }).catch(error => {
            const message = error.responseJSON || error.responseText;
            dispatch(getEntityListFail(store, message))
        })
    }
}

export function getEntityListRequest(storeName) {
    return {
        type: GET_ENTITY_LIST_REQUEST,
        payload: {
            storeName: storeName
        }

    }
}

export function getEntityListSuccess(storeName, payload) {
    return {
        type: GET_ENTITY_LIST_SUCCESS,
        payload: {
            storeName: storeName,
            list: payload
        }
    }
}

export function getEntityListFail(storeName, payload) {
    return {
        type: GET_ENTITY_LIST_FAIL,
        payload: {
            storeName: storeName,
            errors: payload
        }
    }
}