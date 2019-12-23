import React from 'react';
import Person from './Person'

const Persons = (props) => {
    let filtered = [...props.data]

    const filterPersons = (element) => {
        const name = element.name.toUpperCase()
        const number = element.number.toUpperCase()
        const filter = props.filter.toUpperCase()
        if ( name.search(filter) !== -1 || number.search(filter) !== -1 ){
            return true;
        }
        return false;
    }
    if(props.filter !== ''){
        filtered = props.data.filter(filterPersons)
    }
    
    return (
        <ul>{filtered.map(element => <Person person={element} key={element.id} deleteFunc={props.deleteFunc} />)}</ul>
    )
}

export default Persons