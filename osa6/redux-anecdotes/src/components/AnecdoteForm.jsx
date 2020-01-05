import React from "react"
import { useField } from "../hooks/index"
import { createNewAnecdoteAction } from "../reducers/anecdoteReducer"
import { createSetMessageAction, createEraseMessageAction } from "../reducers/notificationReducer"

const AnecdoteForm = ({store}) => {
    const newAnecdote = useField("text")

    const addAnec = (content) => {
        store.dispatch(createNewAnecdoteAction(content))
        store.dispatch(createSetMessageAction("New anecdote added successfully"))
        setTimeout(() => {
            store.dispatch(createEraseMessageAction())
        }, 3000);
    }

    return (
    <>
        <h2>Create new</h2>
        <form onSubmit={() => addAnec(newAnecdote.value)} >
            <div><input {...newAnecdote} /></div>
            <button>create</button>
        </form>
    </>
    )
}

export default AnecdoteForm