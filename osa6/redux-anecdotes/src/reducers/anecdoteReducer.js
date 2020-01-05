const anecdotesAtStart = [
  'Adding manpower to a late software project makes it later!',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'If it hurts, do it more often',
  'Premature optimization is the root of all evil.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createVoteAction = (id) => {
  const action = {
    type: "VOTE",
    data: id
  }
  return action
}

export const createNewAnecdoteAction = (content) => {
  const action = {
    type: "CREATE",
    data: content
  }
  return action
}

const reducer = (state = initialState, action) => {
  let newAnec = {}
  let newState = []
  switch (action.type) {
    case "VOTE":
      console.log("Äänestetään...")
      const id = action.data
      const anec = state.find(a => a.id === id)
      newAnec = { ...anec, votes: anec.votes + 1 }
      state.map(a => a.id === id ? newState.push(newAnec) : newState.push(a))
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case "CREATE":
      console.log("Luodaan...")
      return state.concat(asObject(action.data))
    default:
      console.log("Ei tehdä mitään... (anekdootti)")
      return state
  }
}

export default reducer