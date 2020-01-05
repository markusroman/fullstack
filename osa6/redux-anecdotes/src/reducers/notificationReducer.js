export const createSetMessageAction = (content) => {
    const action = {
        type: "NOTIFY",
        data: content
    }
    return action
}

export const createEraseMessageAction = () => {
    const action = {
        type: "DON'T NOTIFY"
    }
    return action
}


const reducer = (state = "", action) => {
    switch (action.type) {
        case "NOTIFY":
            console.log("Viesti...")
            return action.data
        case "DON'T NOTIFY":
            console.log("Poistetaan viesti...")
            return ""
        default:
            console.log("Ei tehdä mitään... (viesti)")
            return state
    }
}

export default reducer