import React from "react"
import useField from "../hooks/index"
import { setMessage } from "../reducers/notificationReducer"
import { setUser, clearUser } from "../reducers/loginReducer"
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

const Login = (props) => {
  const username = useField("username")
  const password = useField("password")

  const onSubmit = (event) => {
    event.preventDefault()
    username.resetState()
    password.resetState()
    if (username === "" || password === "") {
      props.setMessage("Wrong credentials", 5)
      return null
    }
    props.setUser({ username: username.value, password: password.value })
    if (props.user === null){
      props.setMessage("Wrong credentials", 5)
      return null
    }
    props.setMessage("Login successful", 5)
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>username</label>
          <input id="username" {...username.inputprops()} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id="password" {...password.inputprops()} />
        </Form.Field>
        <Button type='submit'>login</Button>
      </Form>
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