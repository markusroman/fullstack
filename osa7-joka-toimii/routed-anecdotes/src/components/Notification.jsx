import React from 'react'

const Notification = ({ message }) => {
    const style = {
        width: 500,
        color: 'blue',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === "") {
        return null
    }
    return (
        <div style={style} >
            {message}
        </div>
    )
}

export default Notification