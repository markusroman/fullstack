import loginService from "../services/login"
import blogService from "../services/blogs"
import userService from "../services/users"

export const setUser = (credentials) => {
    return async dispatch => {
        const loggedUser = await loginService.login(credentials)
        const allUsers = await userService.getAll()
        dispatch({
            type: "LOGIN",
            data: {
                loggedUser,
                allUsers
            }
        })
    }
}

export const initUser = (userJSON) => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        dispatch({
            type: "INIT_USER",
            data: {
                userJSON,
                allUsers
            }
        })
    }
}

export const clearUser = () => {
    return async dispatch => {
        dispatch({
            type: "CLEAR_USER",
            data: null
        })
    }
}

const reducer = (state = null, action) => {
    let user = null
    switch (action.type) {
        case "INIT_USER":
            console.log("Haetaan käyttäjä selaimen muistista...")
            user = JSON.parse(action.data.userJSON)
            blogService.setToken(user.token)
            return user
        case "LOGIN":
            console.log("Kirjaudutaan...")
            user = action.data.loggedUser
            if (user === undefined) {
                return state
            }
            window.localStorage.setItem(
                'loggedblogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            console.log(user)
            return user
        case "CLEAR_USER":
            console.log("Kirjaudutaan ulos...")
            window.localStorage.removeItem('loggedblogappUser')
            return null
        default:
            return state
    }
}

export default reducer