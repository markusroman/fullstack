import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from "../reducers/blogReducer"
import { Link } from 'react-router-dom'

const Blogs = (props) => {
  return (
    <>
      <h2>All blogs</h2>
      <ul>
        {props.blogs.map(b => 
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}
  
export default connect(
  mapStateToProps,
  { likeBlog }
)(Blogs)