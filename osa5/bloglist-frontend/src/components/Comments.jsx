import React from 'react'
import { setMessage } from "../reducers/notificationReducer"
import { commentBlog } from "../reducers/blogReducer"
import { connect } from 'react-redux'
import useField from "../hooks/index"
import { Form, Button } from 'semantic-ui-react'

const Comments = (props) => {
    const newComment = useField("comment")

  if(props.blog === undefined){
    return <p>Still loading</p>
  }
  
  const comments = props.blog.comments

  const onSubmit = (event) => {
    event.preventDefault()
    if (newComment.value === "") {
        props.setMessage("Comment can't be empty", 5)
        return null
    }
    props.commentBlog(newComment.value, props.blog)
    props.setMessage(`A new comment ${newComment.value} added to blog "${props.blog.title}"`, 5)
    newComment.resetState()
    
    }

  return (
    <div>
      <Form onSubmit={onSubmit}>
      <Form.Field>
          <label></label>
          <input {...newComment.inputprops()} />
      </Form.Field>
      <Button type="submit">Add comment</Button>
      </Form>
      {
        comments === undefined || comments.length === 0 ?
        <p>Blog has no comments</p>
        :
        <>
          <p>All comments</p>
          <ul>
            {comments.map(c => <li key={c} >{c}</li>)}
          </ul>
        </>
      }
        
    </div>
  )
}

const mapDispatchToProps = {
  setMessage,
  commentBlog
}

export default connect(
  null,
  mapDispatchToProps
)(Comments)