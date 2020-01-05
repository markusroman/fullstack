import React from 'react'
import { createVoteAction } from "../reducers/anecdoteReducer"
import { createSetMessageAction, createEraseMessageAction } from "../reducers/notificationReducer"

const AnecdoteList = ({store}) => {
    const {anecdotes, filter} = store.getState()

    const vote = (id) => {
        store.dispatch(createVoteAction(id))
        const anec = anecdotes.find(a => a.id === id)
        store.dispatch(createSetMessageAction(`You voted "${anec.content}"`))
        setTimeout(() => {
            store.dispatch(createEraseMessageAction())
        }, 3000);
    }

    const anecsToShow = () => {
        if ( filter === "" ) {
          return anecdotes
        }
        return anecdotes.filter(a => a.content.toUpperCase().search(filter.toUpperCase()) !== -1)
      }
    

    return (
        <>
            <h2>All anecdotes</h2>
            <ul>
                {anecsToShow().map(anecdote =>
                <li key={anecdote.id}>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                </li>
                
            )}
            </ul>
        </>
    )
}

export default AnecdoteList