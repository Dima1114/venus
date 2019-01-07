
export const ADD_TODO = 'ADD_TODO';
export const INIT_BASE_URL = 'INIT_BASE_URL';

export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function initBaseUrl(baseUrl) {
    return {
        type: INIT_BASE_URL,
        payload: {
            baseUrl: baseUrl
        }
    }
}