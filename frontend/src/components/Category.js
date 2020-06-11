import React, { useState, useContext, useEffect } from 'react'
import { Checkbox } from 'antd';
import { ItemsContext } from '../context/items/ItemsContext'
import store from 'store'

export const Category = () => {

    const { checkedList, setCheckedList, fetchItems } = useContext(ItemsContext)

    const CheckboxGroup = Checkbox.Group;

    const plainOptions = ['Apple', 'Samsung', 'HTC', 'Lenovo', 'Nokia'];
    const [indeterminate, setIndeterminate] = useState(false)
    const [checkAll, setCheckAll] = useState(checkedList === null || checkedList.length === 0 ? false : true)

    const onChange = (e) => {
        setCheckedList(e)
        setIndeterminate(!!e.length && e.length < plainOptions.length)
        setCheckAll(e.length === plainOptions.length)
    }

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
    }

    useEffect(() => {
        store.set('checkedList', checkedList)
        fetchItems()
        // eslint-disable-next-line
    }, [checkedList])

    return (
        <div className="category mt-3">
            <h3>Категории</h3>
            <hr />
            <div>
                <div className="site-checkbox-all-wrapper">
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >
                        All
                    </Checkbox>
                </div>
                <hr />
                <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
