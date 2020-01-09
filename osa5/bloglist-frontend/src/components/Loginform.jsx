import React from "react"
import useField from "../hooks/index"
import { setMessage } from "../reducers/notificationReducer"
import { setUser, clearUser } from "../reducers/loginReducer"
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
    props.setUser({ username: username.value, password: password.value })
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