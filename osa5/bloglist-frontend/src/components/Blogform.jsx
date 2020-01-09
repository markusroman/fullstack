import React from "react"
import useField from "../hooks/index"
import { connect } from 'react-redux'
import { createBlog } from "../reducers/blogReducer"
import { setMessage } from "../reducers/notificationReducer"
import { Form, Button } from 'semantic-ui-react'

const Blogform = (props) => {
    const title = useField("title")
    const author = useField("author")
    const url = useField("urladdress")

    const onSubmit = (event) => {
        event.preventDefault()
        if (title.value === "" || url.value === "" || author.value === "") {
            props.setMessage("Blog can't have empty fields", 5)
            return null
        }
      
        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value,
            likes: 0,
            comments: []
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
            <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>Title</label>
                <input id="title" {...title.inputprops()} />
            </Form.Field>
            <Form.Field>
                <label>Author</label>
                <input id="author" {...author.inputprops()} />
            </Form.Field>
            <Form.Field>
                <label>Url</label>
                <input id="url" {...url.inputprops()} />
            </Form.Field>
            <Button type='submit'>save</Button>
            </Form>
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