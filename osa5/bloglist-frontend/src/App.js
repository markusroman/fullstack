import React, { useEffect } from "react"
import Loginform from "./components/Loginform"
import Blogform from "./components/Blogform"
import Togglable from "./components/Togglable"
import Menu from "./components/Menu"
import { initBlogs } from "./reducers/blogReducer"
import { setMessage } from "./reducers/notificationReducer"
import { clearUser, initUser } from "./reducers/loginReducer"
import { connect } from "react-redux"
import { initUsers } from "./reducers/userReducer"
import { Container, Message, Button } from "semantic-ui-react"

const App = props => {
  useEffect(() => {
    props.initBlogs()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedblogappUser")
    if (!loggedUserJSON) {
      return
    }
    props.initUser(loggedUserJSON)
  }, [])
  useEffect(() => {
    props.initUsers()
  }, [])

  const handleLogout = event => {
    event.preventDefault()
    props.clearUser()
    props.setMessage(`Logged out ${props.user.name}`, 5)
  }

  return (
    <Container>
      <h1>BLOGS</h1>
      {props.notification && <Message success>{props.notification}</Message>}
      {props.user === null ? (
        <Togglable buttonLabel="log in">
          <Loginform />
        </Togglable>
      ) : (
        <>
          <div>
            Logged in as {props.user.username}
            <Button type="button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Togglable buttonLabel="new blog">
            <Blogform />
          </Togglable>
          <Menu />
        </>
      )}
    </Container>
  )
}

const mapDispatchToProps = {
  initBlogs,
  setMessage,
  clearUser,
  initUser,
  initUsers,
}
const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs,
    notification: state.notification,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
