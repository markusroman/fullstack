import React, { useState } from "react"

const Blogform = ({ addBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const submit = (event) => {
        event.preventDefault()
        const blogObject = {
            title,
            author,
            url
        }
        setTitle("")
        setAuthor("")
        setUrl("")
        addBlog(blogObject)
    }

    return (
        <>
            <h2>Add a new blog</h2>
            <form onSubmit={submit}>
                <div>
                    Title
                <input
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div>
                    Author
                <input
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    Url
                <input
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit">save</button>
            </form>

        </>
    )
}

export default Blogform