import React from "react"
import { useField } from "../hooks/index"
import { connect } from 'react-redux'
import { setMessage } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const newAnecdote = useField("anec")

    const addAnec = (event) => {
        event.preventDefault()
        if (newAnecdote.value === ""){
            props.setMessage("Anecdote can't be empty", 5)
            return null
        }
        props.createAnecdote(newAnecdote.value)
        newAnecdote.value = ""
        event.target.anec.value = ""
        props.setMessage("New anecdote added successfully", 5)
    }

    return (
    <>
        <h2>Create new</h2>
        <form onSubmit={addAnec} >
            <div><input name="anec" {...newAnecdote} /></div>
            <button type="submit" >create</button>
        </form>
    </>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setMessage
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)