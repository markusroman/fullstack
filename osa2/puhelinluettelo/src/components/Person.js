import React from 'react';

const Person = ({ person, deleteFunc }) => {
    const handleButton = (event) => {
        event.preventDefault()
        deleteFunc(event.target.id)
    }
    return (
        <>
            <li>{person.name} {person.number} <button type="button" onClick={handleButton} id={person.id} >delete</button></li>
        </>
    )
}

export default Person