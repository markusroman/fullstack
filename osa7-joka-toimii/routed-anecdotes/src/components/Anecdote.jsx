import React from "react"

const Anecdote = ({ anecdote }) => {
    console.log("Tietty...", anecdote)
    return (
        <div>
            <h2>{`"${anecdote.content}" by ${anecdote.author}`}</h2>
            <p>Has {anecdote.votes} likes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote