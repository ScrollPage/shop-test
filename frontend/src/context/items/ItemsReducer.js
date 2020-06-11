import {
    SET_LOADING,
    FETCH_ITEMS_SUCCESS,
    FETCH_ERROR,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    FETCH_ITEM_BY_ID_SUCCESS,
    SET_CHECKED_LIST
} from '../types'

const handlers = {
    [SET_LOADING]: state => ({...state, loading: true}),
    [FETCH_ITEMS_SUCCESS]: (state, {payload}) => ({...state, items: payload, loading: false}),
    [FETCH_ITEM_BY_ID_SUCCESS]: (state, {payload}) => ({...state, item: payload, loading: false}),
    [FETCH_ERROR]: (state, {payload}) => ({...state, error: payload, loading: false}),
    [SET_CURRENT_PAGE]: (state, {payload}) => ({...state, currentPage: payload}),
    [SET_TOTAL_COUNT]: (state, {payload}) => ({...state, totalItemsCount: payload}),
    [SET_CHECKED_LIST]: (state, {payload}) => ({...state, checkedList: payload}),
    DEFAULT: state => state
} 

export const ItemsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

