import React from 'react'

const Error = ({ message }) => {
    const style = {
        width: 300,
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }
    return (
        <div style={style} >
            {message}
        </div>
    )
}

export default Error