import React, {useState} from 'react'

const Filter = ({handleFilter}) => {
    const [filter, setFilter] = useState('')
    const changeFilter = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
        handleFilter(event.target.value)
    }
    return (
        <div>
            filter countries <input value={filter} text='find countries' onChange={changeFilter} />
        </div>
    )
}

export default Filter