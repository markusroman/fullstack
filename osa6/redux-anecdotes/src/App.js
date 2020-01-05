import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = ({ store }) => {

  return (
    <>
      <h1>ANECDOTES</h1>
      <Notification store={store} />
      <AnecdoteForm store={store} />
      <br></br>
      <Filter store={store} />
      <AnecdoteList store={store} />
    </>
  )
}

export default App