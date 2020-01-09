export const setMessage = (content, time) => {
  return async dispatch => {
    dispatch({
      type: "NOTIFY",
      data: content,
    })
    setTimeout(() => {
      dispatch({
        type: "DON'T NOTIFY",
      })
    }, time * 1000)
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFY":
      console.log("Viesti...")
      return action.data

    case "DON'T NOTIFY":
      console.log("Poistetaan viesti...")
      return null

    default:
      return state
  }
}

export default reducer
