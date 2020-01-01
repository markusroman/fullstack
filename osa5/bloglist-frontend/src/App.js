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
    console.log("HAKU ALKAA")
    console.log("BLOGSERVICE", blogService)
    blogService.getAll()
      .then(initialBlogs => {
        console.log(initialBlogs)
        setblogs(initialBlogs)
      })
      .catch(error => console.log(error))
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
    const user = loginService.login({
      username, password,
    })
    console.log(user)
    if (user === null) {
      setMessage("Wrong credentials")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    window.localStorage.setItem(
      'loggedblogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setMessage(`Logged in as ${user.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    if (blogObject.title === "" || blogObject.url === "" || blogObject.author === "") {
      setMessage("Blog can't have empty fields")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }
    const addedBlog = blogService.create(blogObject)
    if (addedBlog === null) {
      setMessage("Something went wrong")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }
    setMessage(`A new blog "${addedBlog.title}" by ${addedBlog.author} added by ${user.name}`)
    setblogs(blogs.concat(addedBlog))
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const delBlog = (blogObject) => {
    if (!window.confirm(`Remove blog "${blogObject.title}" by ${blogObject.author}?`)) {
      return null
    }
    const response = blogService.remove(blogObject.id)
    if (response === null) {
      setMessage("Something went wrong")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }
    setMessage(`Blog "${blogObject.title}" by ${blogObject.author} removed by ${user.name}`)
    setblogs(blogs.filter(b => b.id !== blogObject.id))
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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

  const addLike = async (id) => {
    const blog = blogs.filter(b => b.title === id)
    const newBlog = {
      ...blog[0],
      likes: blog[0].likes + 1,
    }
    const updated = blogService.update(newBlog.id, newBlog)
    if (updated === null) {
      setMessage("Something went wrong")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }
    blogService.getAll().then(blogs => setblogs(blogs))
    setMessage(`Blog "${newBlog.title}" by ${newBlog.author} liked by ${user.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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