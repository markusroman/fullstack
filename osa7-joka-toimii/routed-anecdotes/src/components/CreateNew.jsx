import React, { useState } from "react"
import { withRouter } from "react-router-dom";

const CreateNewNoHistory = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content,
        author,
        info,
        votes: 0
      })
      props.history.push("/anecdotes")
    }
    console.log("Uusi...")
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  
  }

  const CreateNew = withRouter(CreateNewNoHistory)

  export default CreateNew