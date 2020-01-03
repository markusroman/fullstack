import React from "react"
import useField from "../hooks/index"

const Blogform = ({ addBlog }) => {
    const title = useField("title")
    const author = useField("author")
    const url = useField("urladdress")

    const submit = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        title.resetState()
        author.resetState()
        url.resetState()
        addBlog(blogObject)
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

export default Blogform