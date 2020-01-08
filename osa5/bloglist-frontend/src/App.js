import React, { useEffect } from "react"
import blogService from './services/blogs'
import Notification from "./components/Notification"
import Loginform from "./components/Loginform"
import Blogform from "./components/Blogform"
import Blogs from "./components/Blogs"
import Togglable from "./components/Togglable"
import { initBlogs } from "./reducers/blogReducer"
import { setMessage } from "./reducers/notificationReducer"
import { clearUser, initUser } from "./reducers/userReducer"
import { connect } from 'react-redux'

const App = (props) => {

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.initUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedblogappUser')
    props.clearUser()
    props.setMessage(`Logged out ${props.user.name}`, 5)
  }



  return (
    <div>
      <h1>BLOGS</h1>
      <Notification />
      {
        props.user === null ?
          <Togglable buttonLabel='log in'>
            <Loginform />
          </Togglable>
          :
          <>
            <div>
              Logged in as {props.user.username}
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
            <Togglable buttonLabel='new blog'>
              <Blogform />
            </Togglable>
            {
              props.blogs.length === 0 ?
                <p>No blogs in database</p>
                :
                <Blogs />
            }
          </>
      }
    </div>
  )
}

const mapDispatchToProps = {
  initBlogs,
  setMessage,
  clearUser,
  initUser
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)