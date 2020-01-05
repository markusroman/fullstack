import React from 'react'
import { createFilterChangeAction } from "../reducers/filterReducer"


const Filter = (props) => {
    const handleChange = (event) => {
        props.store.dispatch(createFilterChangeAction(event.target.value))
    }
    const style = {
        marginBottom: 10
    }
  
    return (
        <div style={style}>
            filter <input type="text" onChange={handleChange} />
        </div>
    )
  }
  
  export default Filter