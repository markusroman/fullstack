import React from "react"
import useField from "../hooks/index"

const Login = ({ handleLogin }) => {
    const username = useField("username")
    const password = useField("password")

    const submit = (event) => {
        event.preventDefault()
        username.resetState()
        password.resetState()
        handleLogin(username.value, password.value)
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

export default Login