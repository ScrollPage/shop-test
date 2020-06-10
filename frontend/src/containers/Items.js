import React, { useEffect, useContext } from 'react'

import { Loader } from '../components/Loader'
import { Paginator } from '../components/Paginator'
import { Card } from '../components/Card'
import { Layout } from './Layout'
import { ItemsContext } from '../context/items/ItemsContext'
import { BasketContext } from '../context/basket/BasketContext'

export const Items = () => {

    const { fetchItems, setCurrentPage, items, totalItemsCount, pageSize, currentPage, loading } = useContext(ItemsContext)
    const { addItemToBasket } = useContext(BasketContext)

    useEffect(() => {
        fetchItems(true)
        // eslint-disable-next-line
    }, [currentPage])


    const pageChanged = (index) => {
        setCurrentPage(index)
    }

    const renderCards = () => {
        return items.map((item, index) => {
            return (
                <Card
                    key={item.id}
                    item={item}
                    addItemToBasket={addItemToBasket}
                    id={index}
                />
            )
        })
    }

    return (
        <Layout>
            <Paginator
                totalItemsCount={totalItemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                pageChanged={pageChanged}
                portionSize={4}
            />

            <div className="card-group row">
                {
                    loading || items.length === 0
                        ? <Loader />
                        : renderCards()
                }
            </div>
        </Layout>
    )
}