import React, {useState} from 'react'
const Blog = ({ blog, delBlog, addLike, changeShow, user }) => {

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
    width: 600
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

const removeButton = () => {
  if(user === null){
    return null
  }
  if (blog.user === user.username){
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

export default Blog