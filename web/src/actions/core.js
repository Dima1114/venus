import $ from 'jquery'
import {formRequestProps} from "../utils/formRequestProps";

export const GET_ENTITY_LIST_REQUEST = 'GET_ENTITY_LIST_REQUEST';
export const GET_ENTITY_LIST_SUCCESS = 'GET_ENTITY_LIST_SUCCESS';
export const GET_ENTITY_LIST_FAIL = 'GET_ENTITY_LIST_FAIL';
export const SAVE_ENTITY_LIST_REQUEST = 'SAVE_ENTITY_LIST_REQUEST';
export const SAVE_ENTITY_LIST_SUCCESS = 'SAVE_ENTITY_LIST_SUCCESS';
export const SAVE_ENTITY_LIST_FAIL = 'SAVE_ENTITY_LIST_FAIL';


export function getEntityList(store, entities, paramName, params) {
    return function (dispatch) {
        dispatch(getEntityListRequest(store));
        $.ajax({
            type: 'GET',
            url: '/' + entities +'/search'+ formRequestProps(params),
            contentType: 'application/json',
        }).then(response => {
            dispatch(getEntityListSuccess(store, response._embedded[paramName || entities]))
        }).catch(error => {
            const message = error.responseJSON || error.responseText;
            dispatch(getEntityListFail(store, message))
        })
    }
}

function getEntityListRequest(storeName) {
    return {
        type: GET_ENTITY_LIST_REQUEST,
        payload: {
            storeName: storeName
        }

    }
}

function getEntityListSuccess(storeName, payload) {
    return {
        type: GET_ENTITY_LIST_SUCCESS,
        payload: {
            storeName: storeName,
            list: payload
        }
    }
}

function getEntityListFail(storeName, payload) {
    return {
        type: GET_ENTITY_LIST_FAIL,
        payload: {
            storeName: storeName,
            errors: payload
        }
    }
}

export function saveEntityList(store, entities, path, bodies, paramName, params) {
    return function (dispatch) {
        dispatch(saveEntityListRequest(store));
        $.ajax({
            type: 'PATCH',
            url: '/' + entities + path + formRequestProps(params),
            contentType: 'application/json',
            data: JSON.stringify(bodies)
        }).then(response => {
            dispatch(saveEntityListSuccess(store, response._embedded[paramName || entities]))
        }).catch(error => {
            const message = error.responseJSON || error.responseText;
            dispatch(saveEntityListFail(store, message))
        })
    }
}

function saveEntityListRequest(storeName) {
    return {
        type: SAVE_ENTITY_LIST_REQUEST,
        payload: {
            storeName: storeName
        }

    }
}

function saveEntityListSuccess(storeName, payload) {
    return {
        type: SAVE_ENTITY_LIST_SUCCESS,
        payload: {
            storeName: storeName,
            list: payload
        }
    }
}

function saveEntityListFail(storeName, payload) {
    return {
        type: SAVE_ENTITY_LIST_FAIL,
        payload: {
            storeName: storeName,
            errors: payload
        }
    }
}