import React from "react"
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes, vote }) => {
    const handleVote = (event) => {
        event.preventDefault()
        vote(event.target.id)
    }
    console.log("Kaikki...", anecdotes)
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <li key={anecdote.id} >
                        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                        <button type="button" onClick={handleVote} id={anecdote.id} >vote</button>
                    </li>
                )}
            </ul>
        </div>
  )
}

export default AnecdoteList