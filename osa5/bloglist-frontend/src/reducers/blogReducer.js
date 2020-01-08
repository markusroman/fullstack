import blogService from "../services/blogs"

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
        console.log(blog, newBlog)
        dispatch({
            type: "LIKE_BLOG",
            data: newBlog
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: "CREATE_BLOG",
            data: newBlog
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const delBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'DEL_BLOG',
            data: blog.id,
        })
    }
}


const reducer = (state = [], action) => {
    let newState = []
    switch (action.type) {
        case "LIKE":
            console.log("Tykätään...")
            state.map(a => a.id === action.data.id ? newState.push(action.data) : newState.push(a))
            newState.sort((a, b) => b.likes - a.likes)
            return newState

        case "CREATE":
            console.log("Luodaan...")
            return state.concat(action.data)

        case "INIT_BLOGS":
            console.log("Alustetaan...")
            const blogs = action.data
            blogs.map(b => b.user = b.user.username)
            blogs.sort((a, b) => b.likes - a.likes)
            return blogs

        case "DEL_BLOG":
            console.log("Poistetaan...")
            return state.filter(b => b.id !== action.data)

        default:
            return state

    }
}



export default reducer