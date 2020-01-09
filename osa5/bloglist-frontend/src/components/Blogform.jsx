import React from "react"
import useField from "../hooks/index"
import { connect } from 'react-redux'
import { createBlog } from "../reducers/blogReducer"
import { setMessage } from "../reducers/notificationReducer"

const Blogform = (props) => {
    const title = useField("title")
    const author = useField("author")
    const url = useField("urladdress")

    const submit = (event) => {
        event.preventDefault()
        if (title.value === "" || url.value === "" || author.value === "") {
            props.setMessage("Blog can't have empty fields", 5)
            return null
        }
      
        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value,
            likes: 0
        }
        title.resetState()
        author.resetState()
        url.resetState()
        props.createBlog(blogObject)
        props.setMessage(`A new blog "${blogObject.title}" by ${blogObject.author} created!`, 5)
    }

    return (
        <>
            <h2>Add a new blog</h2>
            <form onSubmit={submit}>
                <div>
                    Title <input {...title.inputprops()} />
                </div>

                <div>
                    Author <input {...author.inputprops()} />
                </div>

                <div>
                    Url <input {...url.inputprops()} />
                </div>

                <button type="submit">save</button>
            </form>

        </>
    )
}

const mapDispatchToProps = {
    createBlog,
    setMessage
  }
  const mapStateToProps = (state) => {
    return {
      blogs: state.blogs
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Blogform)