import React, { useState} from 'react'
import PropTypes from 'prop-types'

export const Paginator = ({ totalItemsCount, pageSize, currentPage, pageChanged, portionSize }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize))
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className="paginator btn-group mb-3" role="group">
            {portionNumber > 1 &&
                <button className="btn btn-secondary" onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

            {pages
                .filter(index => index >= leftPortionPageNumber && index <= rightPortionPageNumber)
                .map(index => {
                    return <button
                        className={currentPage === index ? "text-info btn btn-secondary" : "btn btn-secondary"}
                        key={index}
                        onClick={() => pageChanged(index)}
                    >{index}&nbsp;</button>
                })}

            {portionNumber < portionCount &&
                <button className="btn btn-secondary" onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    )
}

Paginator.propTypes = {
    totalItemsCount: PropTypes.number,
    pageSize: PropTypes.number, 
    currentPage: PropTypes.number, 
    pageChanged: PropTypes.func, 
    portionSize: PropTypes.number
}
