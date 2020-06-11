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
    FETCH_ITEM_BY_ID_SUCCESS,
    SET_CHECKED_LIST
} from '../types'

export const ItemsState = ({ children }) => {
    const initialState = {
        items: [],
        item: null,
        pageSize: 9,
        currentPage: 1,
        totalItemsCount: 0,
        loading: false,
        error: null,
        checkedList: ['Apple','Samsung','HTC','Lenovo','Nokia']
    }

    const [state, dispatch] = useReducer(ItemsReducer, initialState)

    const fetchItems = async () => {
        setLoading()
        try {
            const response = await axios.get(`http://localhost:8000/api/${state.checkedList}/${state.currentPage}/${state.pageSize}/`)
            fetchItemsSuccess(response.data)
            const length = await axios.get(`http://localhost:8000/api/len/`)
            setTotalCount(length.data[0].total)

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

    const setCheckedList = (checkedList) => dispatch({type: SET_CHECKED_LIST, payload: checkedList})

    const { items, item, pageSize, currentPage, totalItemsCount, loading, checkedList } = state

    return (
        <ItemsContext.Provider value={{
            fetchItems,
            fetchItemById,
            setCurrentPage,
            setTotalCount,
            setCheckedList,
            items, item, pageSize, currentPage, totalItemsCount, loading, checkedList
        }}>
            {children}
        </ItemsContext.Provider>
    )
}

ItemsState.propTypes = {
    children: PropTypes.element
}

