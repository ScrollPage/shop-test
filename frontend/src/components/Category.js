import React, { useState, useContext } from 'react'
import { Checkbox } from 'antd';
import { ItemsContext } from '../context/items/ItemsContext'

export const Category = () => {

    const { checkedList, setCheckedList } = useContext(ItemsContext)

    const CheckboxGroup = Checkbox.Group;

    const plainOptions = ['Apple', 'Samsung', 'HTC', 'Lenovo', 'Nokia'];
    const [indeterminate, setIndeterminate] = useState(false)
    const [checkAll, setCheckAll] = useState(true)

    const onChange = (e) => {
        console.log(e)
        setCheckedList(e)
        setIndeterminate(!!e.length && e.length < plainOptions.length)
        setCheckAll(e.length === plainOptions.length)
    }

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
    }

    return (
        <div className="category mt-3">
            <h1>Категории</h1>
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
                <br />
                <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
