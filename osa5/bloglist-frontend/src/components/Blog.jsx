import React, {useState} from 'react'
import { likeBlog, delBlog } from "../reducers/blogReducer"
import { setMessage } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  const blog = props.blog

  const removeBlog = (event) => {
    event.preventDefault()
    props.delBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} removed!`, 5)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 600
  }

  const onLikeClick = (event) => {
    event.preventDefault()
    props.likeBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} liked!`, 5)
  }


  const onShowClick = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const removeButton = () => {
    if(props.user === null){
      return null
    }
    if (blog.user === props.user.username){
      return <button type="button" id={blog.id} onClick={removeBlog} >remove</button>
    } else {
      return null
    }
  }

  return (
    <>
    {
      showAll ?
        <div style={blogStyle} onClick={onShowClick} className="allContent" >
          Title:  {blog.title}<br></br>
          Url:  {blog.url}<br></br>
          Author:  {blog.author}<br></br>
          <div>Likes:  {blog.likes}<button type="button" id={blog.title} onClick={onLikeClick} >like</button></div> 
          {removeButton()}
        </div>
        :
        <div style={blogStyle} onClick={onShowClick} className="someContent" >
          {blog.title} -- {blog.author} {removeButton()}
        </div>
    }
    </>
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