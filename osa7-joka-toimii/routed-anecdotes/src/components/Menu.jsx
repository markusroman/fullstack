import React from "react"
import {
    BrowserRouter as Router,
    Route, Link
  } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import Anecdote from "./Anecdote"
  
  const Menu = (props) => {
    const padding = {
      paddingRight: 5
    }
    return (
        <div>
          <Router>
            <div>
              <div>
                <Link style={padding} to="/anecdotes">anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
              </div>
              <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={props.anecdotes} vote={props.vote} />} />
              <Route path="/create" render={() => <CreateNew addNew={props.addNew} />} />
              <Route path="/about" render={() => <About />} />
              <Route exact path="/anecdotes/:id" render={({ match }) => 
                <Anecdote anecdote={props.anecdotes.find(a => a.id === match.params.id)} />
              } />
            </div>
          </Router>
        </div>
      )
  }

  export default Menu