import React from 'react'

const Notification = ({message}) => {
    const delStyle = {
        width: 300,
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const addStyle = {
        width: 300,
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null){
        return null
    }
    if (message.search('Information of') !== -1){
        return(
            <div style={delStyle} >
                {message}
            </div>
        )
    }
    return (
        <div style={addStyle} >
            {message}
        </div>
    )
}

export default Notification