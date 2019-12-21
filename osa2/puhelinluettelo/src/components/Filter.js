import React, {useState} from 'react'

const Filter = ({handleFilter}) => {
    const [filter, setFilter] = useState('')
    const changeFilter = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
        handleFilter(event.target.value)
    }
    return (
        <>
            <p>filter shown with</p>
            <input value={filter} onChange={changeFilter} />
        </>
    )
}

export default Filter