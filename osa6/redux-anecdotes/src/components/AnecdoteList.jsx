import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = (props) => {
    const vote = (anec) => {
        props.voteAnecdote(anec)
        props.setMessage(`You voted "${anec.content}"`, 5)
    }

    if (props.visibleAnecs.length === 0){
        return null
    }

    return (
        <>
            <h2>All anecdotes</h2>
            <ul>
                {props.visibleAnecs.map(anecdote =>
                <li key={anecdote.id}>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                </li>
                )}
            </ul>
        </>
    )
}

const anecsToShow = ({anecdotes, filter}) => {
    if ( filter === "" ) {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toUpperCase().search(filter.toUpperCase()) !== -1)
}

const mapDispatchToProps = {
    voteAnecdote,
    setMessage
}
const mapStateToProps = (state) => {
    return {
      visibleAnecs: anecsToShow(state),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)