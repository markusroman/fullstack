import React from 'react'
import { likeBlog, delBlog } from "../reducers/blogReducer"
import { setMessage } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const Blog = (props) => {
  if(props.blog === undefined){
    return null
  }

  const blog = props.blog

  const removeBlog = (event) => {
    event.preventDefault()
    props.delBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} removed!`, 5)
  }

  const onLikeClick = (event) => {
    event.preventDefault()
    props.likeBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} liked!`, 5)
  }

  const removeButton = () => {
    if(props.user === null){
      return null
    }
    console.log(blog, props.user)
    if (blog.user === props.user.id){
      return <button type="button" id={blog.id} onClick={removeBlog} >remove</button>
    } else {
      return null
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br></br>
      Author:  {blog.author}<br></br>
      <div>Likes:  {blog.likes}<button type="button" id={blog.title} onClick={onLikeClick} >like</button></div> 
      {removeButton()}
    </div>
  )
}

const mapDispatchToProps = {
  likeBlog,
  delBlog,
  setMessage
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)