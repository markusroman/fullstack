import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { initAnecs } from "./reducers/anecdoteReducer"
import { connect } from 'react-redux'

const App = (props) => {

  useEffect(() => {
    props.initAnecs()
  }, [])

  return (
    <>
      <h1>ANECDOTES</h1>
      <Notification />
      <AnecdoteForm />
      <br></br>
      <Filter />
      <AnecdoteList />
    </>
  )
}

export default connect(
  null, { initAnecs }
)(App)