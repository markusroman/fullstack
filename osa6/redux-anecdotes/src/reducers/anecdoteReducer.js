import anecService from "../services/anecdotes"

export const voteAnecdote = (anec) => {
  return async dispatch => {
    const newAnec = await anecService.update({ ...anec, votes: anec.votes + 1 })
    dispatch({
      type: "VOTE",
      data: newAnec
    })
  }
}

export const createAnecdote = anec => {
  return async dispatch => {
    const newAnec = await anecService.create({ content: anec, votes: 0 })
    dispatch({
      type: "CREATE",
      data: newAnec
    })
  }
}

export const initAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecs,
    })
  }
}

const reducer = (state = [], action) => {
  let newState = []
  switch (action.type) {
    case "VOTE":
      console.log("Äänestetään...")
      state.map(a => a.id === action.data.id ? newState.push(action.data) : newState.push(a))
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case "CREATE":
      console.log("Luodaan...")
      return state.concat(action.data)
    case "INIT_ANECS":
      console.log("Alustetaan...")
      return action.data.sort((a, b) => b.votes - a.votes)

    default:
      return state
  }
}



export default reducer