export const createFilterChangeAction = (content) => {
    const action = {
        type: "NEW FILTER",
        data: content
    }
    return action
}

const reducer = (state = "", action) => {
    switch (action.type) {
        case "NEW FILTER":
            console.log("Muutetaan suodatusta...")
            return action.data
        case "JOKU":
            console.log("...")
            return state
        default:
            console.log("Ei tehdä mitään... (suodatin)")
            return state
    }
}

export default reducer