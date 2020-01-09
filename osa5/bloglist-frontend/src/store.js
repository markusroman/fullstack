import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notiReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notiReducer,
    user: loginReducer,
    filter: filterReducer,
    users: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store