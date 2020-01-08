import React from "react"
import useField from "../hooks/index"
import blogService from "../services/blogs"
import { setMessage } from "../reducers/notificationReducer"
import { setUser, clearUser } from "../reducers/userReducer"
import { connect } from 'react-redux'

const Login = (props) => {
  const username = useField("username")
  const password = useField("password")

  const submit = (event) => {
    event.preventDefault()
    username.resetState()
    password.resetState()
    if (username === "" || password === "") {
      props.setMessage("Wrong credentials", 5)
      return null
    }
    props.setUser({ username, password })
    if (props.user === null) {
      props.setMessage("Wrong credentials", 5)
      return null
    }
    window.localStorage.setItem(
      'loggedblogappUser', JSON.stringify(props.user)
    )
    blogService.setToken(props.user.token)
    props.setMessage("Login successful", 5)
  }

  return (
    <>
      <h2>Log in to application</h2>

      <form onSubmit={submit}>
        <div>username <input {...username.inputprops()} /></div>
        <div>password <input {...password.inputprops()} /></div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  setUser,
  clearUser,
  setMessage
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)