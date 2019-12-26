import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

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
        const new_person = {
            name: newName,
            number: newNumber
        }
        if (newName === '' || newNumber === '') {
            return null
        }
        if (persons.find(element => element.number === newNumber) !== undefined) {
            window.alert(`${newNumber} is already in use`)
            return null
        }
        if (persons.find(element => element.name === newName) !== undefined) {
            const confirm = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`)
            if (confirm) {
                for (let i = 0; i < persons.length; i++) {
                    if (newName === persons[i].name) {
                        personService.update(persons[i].name, new_person)
                            .then(returnedPerson => {
                                setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
                                setMessage(`Updated ${newName}`)
                                setTimeout(() => {
                                    setMessage(null)
                                }, 5000)
                            })
                        return null
                    }
                }
            }
            setNewName('')
            setNumber('')
            return null
        }

        personService.create(new_person)
            .then(returned => {
                setPersons(persons.concat(returned))
                setNewName('')
                setNumber('')
                setMessage(`Added ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })

    }

    const deleteFunc = id => {
        if (window.confirm(`Delete ${id}?`)) {
            for (let i = 0; i < persons.length; i++) {
                if (id === persons[i].name) {
                    personService.remove(persons[i].name)
                        .then(() => {
                            setPersons(persons.filter(p => p.name !== id))
                            setMessage(`Deleted ${id}`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                        .catch(error => {
                            setMessage(`Information of ${id} has already been removed from server`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                }
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter handleFilter={handleFilter} />
            <h2>add a new</h2>
            <PersonForm submit={submit} newName={newName} newNumber={newNumber}
                handleName={handleName}
                handleNumber={handleNumber} />
            <h2>Numbers</h2>
            <Persons data={persons} filter={filter} deleteFunc={deleteFunc} />
        </div>
    )

}

export default App