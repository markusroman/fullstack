import React, { useState, useEffect } from "react"
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification"
import Loginform from "./components/Loginform"
import Blogform from "./components/Blogform"
import Blogs from "./components/Blogs"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setblogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setblogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (username, password) => {
    try {
      const user = loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedblogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Logged in as ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    try {
      if (blogObject.title === "" || blogObject.url === "" || blogObject.author === "") {
        setMessage("Blog can't have empty fields")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return null
      }
      const addedBlog = blogService.create(blogObject)
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added by ${user.name}`)
      setblogs(blogs.concat(addedBlog))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const delBlog = (blogObject) => {
    try {
      if (!window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
        return null
      }
      blogService.remove(blogObject.id)
      setMessage(`blog ${blogObject.title} by ${blogObject.author} removed by ${user.name}`)
      setblogs(blogs.filter(b => b.id !== blogObject.id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedblogappUser')

    setMessage(`Logged out ${user.name}`)
    setUser(null)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addLike = (id) => {
    try {
      let blog = blogs.filter(b => b.title === id)
      blog.likes++
      const updated = blogService.update(blog.id, blog)
      setMessage(`blog ${updated.title} by ${updated.author} liked by ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const changeShow = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={message} />
      {
        user === null ?
          <Togglable buttonLabel='log in'>
            <Loginform handleLogin={handleLogin} />
          </Togglable>
          :
          <div>
            Logged in as {user.name}
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
      }

      <Togglable buttonLabel='new blog'>
        <Blogform addBlog={addBlog} />
      </Togglable>

      {
        blogs.length === 0 ?
          <p>No blogs in database</p>
          :
          <Blogs blogs={blogs} delBlog={delBlog} addLike={addLike} changeShow={changeShow} />
      }
    </div>
  )
}

export default App