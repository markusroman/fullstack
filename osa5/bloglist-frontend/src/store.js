import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notiReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notiReducer,
    user: userReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store