import blogService from "../services/blogs"

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: "LIKE_BLOG",
      data: newBlog,
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog,
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    })
  }
}

export const delBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: "DEL_BLOG",
      data: blog.id,
    })
  }
}

export const commentBlog = (com, blog) => {
  return async dispatch => {
    const newBlog = await blogService.comment({
      ...blog,
      comments: blog.comments.concat(com),
    })
    dispatch({
      type: "COMMENT_BLOG",
      data: newBlog,
    })
  }
}

const reducer = (state = [], action) => {
  let newState = []
  switch (action.type) {
    case "LIKE_BLOG":
      console.log("Tykätään blogista...")
      state.map(a =>
        a.id === action.data.id
          ? newState.push({ ...a, likes: action.data.likes })
          : newState.push(a)
      )
      newState.sort((a, b) => b.likes - a.likes)
      return newState

    case "CREATE_BLOG":
      console.log("Luodaan blogia...", action.data)
      return [...state, action.data]

    case "INIT_BLOGS":
      console.log("Alustetaan blogit...")
      console.log(action.data)
      action.data.forEach(element => {
        if (element.comments === undefined) {
          element.comments = []
        }
      })
      return action.data.sort((a, b) => b.likes - a.likes)

    case "DEL_BLOG":
      console.log("Poistetaan blogi...")
      return state.filter(b => b.id !== action.data)

    case "COMMENT_BLOG":
      console.log("Kommentoidaan blogia...")
      state.map(a =>
        a.id === action.data.id
          ? newState.push({ ...a, comments: action.data.comments })
          : newState.push(a)
      )
      return newState

    default:
      return state
  }
}

export default reducer
