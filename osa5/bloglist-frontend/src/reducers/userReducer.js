import loginService from "../services/login";

export const setUser = (username, password) => {
    return async dispatch => {
        const loggedUser = await loginService.login({ username, password })
        dispatch({
            type: "SET_USER",
            data: loggedUser
        })
    }
}

export const initUser = (user) => {
    return async dispatch => {
        dispatch({
            type: "INIT_USER",
            data: user
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
    switch (action.type) {
        case "INIT_USER":
            console.log("Haetaan käyttäjä selaimen muistista...")
            return action.data
        case "SET_USER":
            console.log("Kirjaudutaan...")
            return action.data
        case "CLEAR_USER":
            console.log("Kirjaudutaan ulos...")
            return null
        default:
            return state
    }
}

export default reducer