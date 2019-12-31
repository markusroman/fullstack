import React, {useState} from 'react'
const Blog = ({ blog, delBlog, addLike, changeShow }) => {

  const [showAll, setShowAll] = useState(false)

  const removeBlog = (event) => {
    event.preventDefault()
    delBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 800
  }

const onLikeClick = (event) => {
  event.preventDefault()

  addLike(event.target.id)
}

const onShowClick = (event) => {
  event.preventDefault()
  setShowAll(!showAll)
  changeShow()
}

  return (
    <>
    {
      showAll ?
        <div style={blogStyle} onClick={onShowClick}>
          Title:  {blog.title}<br></br>
          Url:  {blog.url}<br></br>
          Author:  {blog.author}<br></br>
          <div>Likes:  {blog.likes}<button type="button" id={blog.title} onClick={onLikeClick} >like</button></div> 
          <button type="button" id={blog.id} onClick={removeBlog} >remove</button>
        </div>
        :
        <div style={blogStyle} onClick={onShowClick}>
          {blog.title} -- {blog.author} <button type="button" id={blog.id} onClick={removeBlog} >remove</button>
        </div>
    }
    </>
  )
}

export default Blog