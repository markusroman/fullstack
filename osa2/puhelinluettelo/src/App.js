import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '123456' },
        { name: 'Ada Lovelace', number: '987654' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const handleName = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        event.preventDefault()
        setNumber(event.target.value)
    }

    const handleFilter = (newFilter) => {
        setFilter(newFilter)
    }
  
    const submit = (event) => {
        event.preventDefault()
        if (newName === '' || newNumber === '' ){
            return
        }
        if (persons.find(element => element.name === newName) !== undefined){
            window.alert(`${newName} is already added to phonebook`)
            return
        }
        if (persons.find(element => element.number === newNumber) !== undefined){
            window.alert(`${newNumber} is already added to phonebook`)
            return
        }
        const new_person = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(new_person))
        setNewName('')
        setNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={handleFilter}/>
            <h2>add a new</h2>
            <PersonForm submit={submit} newName={newName} newNumber={newNumber} 
            handleName={handleName} 
            handleNumber={handleNumber} />
            <h2>Numbers</h2>
            <Persons data={persons} filter={filter} />
        </div>
    )

}

export default App