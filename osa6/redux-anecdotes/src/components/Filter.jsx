import React from 'react'
import { connect } from 'react-redux'
import { createFilterChangeAction } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        props.createFilterChangeAction(event.target.value)
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
  
const mapDispatchToProps = {
    createFilterChangeAction,
}
  
export default connect(
    null,
    mapDispatchToProps
)(Filter)