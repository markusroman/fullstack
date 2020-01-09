import userService from "../services/users"

export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: "INIT_USERS",
            data: users
        })
    }
}

const reducer = (state = [], action) => {
    let all = null
    switch (action.type) {
        case "INIT_USERS":
            console.log("Haetaan käyttäjät palvelimelta...")
            return action.data
        case "INIT_USER":
            all = action.data.allUsers
            return
        case "LOGIN":
            all = action.data.allUsers
            return
        default:
            return state
    }
}

export default reducer