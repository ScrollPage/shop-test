import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { ItemsContext } from './ItemsContext'
import { ItemsReducer } from './ItemsReducer'

import {
    SET_LOADING,
    FETCH_ITEMS_SUCCESS,
    FETCH_ERROR,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    FETCH_ITEM_BY_ID_SUCCESS
} from '../types'

export const ItemsState = ({ children }) => {
    const initialState = {
        items: [],
        item: null,
        pageSize: 3,
        currentPage: 1,
        totalItemsCount: 0,
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(ItemsReducer, initialState)

    const fetchItems = async bool => {
        setLoading()
        try {
            const response = await axios.get(`http://localhost:8000/api/0/${state.currentPage}/${state.pageSize}/`)
            fetchItemsSuccess(response.data)
            if (bool) {
                setTotalCount(10)
            }

        } catch (e) {
            fetchError(e)
        }
    }
    const fetchItemById = async id => {
        setLoading()
        try {
            const response = await axios.get(`http://localhost:8000/items/api/id/${id}/`)
            fetchItemByIdSuccess(response.data)
        } catch (e) {
            fetchError(e)
        }
    }

    const fetchItemByIdSuccess = (item) => dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: item[0] })

    const fetchItemsSuccess = (items) => dispatch({ type: FETCH_ITEMS_SUCCESS, payload: items })

    const fetchError = (e) => dispatch({ type: FETCH_ERROR, payload: e })

    const setCurrentPage = (currentPage) => dispatch({ type: SET_CURRENT_PAGE, payload: currentPage })

    const setLoading = () => dispatch({ type: SET_LOADING })

    const setTotalCount = (totalItemsCount) => dispatch({ type: SET_TOTAL_COUNT, payload: totalItemsCount })

    const { items, item, pageSize, currentPage, totalItemsCount, loading } = state

    return (
        <ItemsContext.Provider value={{
            fetchItems,
            fetchItemById,
            setCurrentPage,
            setTotalCount,
            items, item, pageSize, currentPage, totalItemsCount, loading
        }}>
            {children}
        </ItemsContext.Provider>
    )
}

ItemsState.propTypes = {
    children: PropTypes.element
}

