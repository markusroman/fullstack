import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errmsg, setError] = useState(null)
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
            .catch(error => {
                setError(error.response.data.error)
                setTimeout(() => {
                    setError(null)
                }, 5000)
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
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                for (let i = 0; i < persons.length; i++) {
                    if (newName === persons[i].name) {
                        personService.update(persons[i].id, new_person)
                            .then(returnedPerson => {
                                setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
                                setMessage(`Updated ${newName}`)
                                setTimeout(() => {
                                    setMessage(null)
                                }, 5000)
                            })
                            .catch(error => {
                                setError(error.response.data.error)
                                setTimeout(() => {
                                    setError(null)
                                }, 5000)
                            })
                        setNewName('')
                        setNumber('')
                        return null
                    }
                }
            }
            return null
        }

        personService.create(new_person)
            .then(returned => {
                setPersons(persons.concat(returned))
                setMessage(`Added ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setError(error.response.data.error)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            })
        setNewName('')
        setNumber('')
    }

    const deleteFunc = id => {
        if (window.confirm(`Are you sure you want to delete?`)) {
            for (let i = 0; i < persons.length; i++) {
                if (id === persons[i].id) {
                    personService.remove(persons[i].id)
                        .then(() => {
                            setPersons(persons.filter(p => p.id !== id))
                            setMessage(`Deleted ${persons[i].name}`)
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                        .catch(error => {
                            setError(`Information of ${persons[i].name} has already been removed from server`)
                            setTimeout(() => {
                                setError(null)
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
            <Error message={errmsg} />
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