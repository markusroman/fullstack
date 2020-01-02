import React from 'react'
import Blog from "./Blog"

const Blogs = ({ blogs, delBlog, addLike, changeShow, user }) => {
    blogs.sort((a, b) => {
        return b.likes - a.likes
    })
    return (
        <>
            <h2>All blogs</h2>
            <ul>
                {blogs.map(b => <li key={b.id}><Blog blog={b} delBlog={delBlog} addLike={addLike} changeShow={changeShow} user={user} /></li>)}
            </ul>
        </>
    )
}

export default Blogs


