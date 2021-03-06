import { combineReducers } from 'redux'
import {
    ADD_TODO,
    INIT_BASE_URL
} from "../actions";
import {createReducer} from "./reducerUtils";
import {loginReducer} from "./auth";

function todoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {text: action.text, completed: false}];
        default:
            return state;
    }
}

const initBaseUrl = createReducer({baseUrl: null}, {
    [INIT_BASE_URL]: (state, payload) => {
        return Object.assign({}, state, {
            baseUrl: payload.baseUrl
        });
    },
});

// {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//             return Object.assign({}, initState);
//         case LOGIN_SUCCESS:
//             return Object.assign({}, state, {
//                 accessToken: action.accessToken,
//                 refreshToken: action.refreshToken,
//                 username: action.username,
//                 expTime: action.expTime
//             });
//         case LOGIN_FAIL:
//             return Object.assign({}, state, {
//                 error: action.error
//             });
//         default:
//             return state;
//     }
// }

export default combineReducers({
    todoReducer,
    loginReducer,
    initBaseUrl
});