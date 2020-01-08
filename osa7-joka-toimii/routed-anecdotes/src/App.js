import React, { useState } from 'react'
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Notification from "./components/Notification"

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [message, setMessage] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setMessage(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => {
      setMessage("")
    }, 10000)
  }

  const anecdoteById = (id) => {
    console.log("Haetaan...", id)
    return (
      anecdotes.find(a => a.id === id)
    )

  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    setMessage(`Voted anecdote "${anecdote.content}"`)
    setTimeout(() => {
      setMessage("")
    }, 10000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={message} />
      <Menu anecdotes={anecdotes} addNew={addNew} vote={vote} />
      <Footer />
    </div>
  )
}

export default App