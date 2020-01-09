import userService from "../services/users"

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: "INIT_USERS",
      data: users,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      console.log("Haetaan käyttäjät palvelimelta...")
      return action.data
    default:
      return state
  }
}

export default reducer
