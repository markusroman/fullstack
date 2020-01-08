import React from 'react'
import Blog from "./Blog"
import { connect } from 'react-redux'

const Blogs = (props) => {
    return (
      <>
        <h2>All blogs</h2>
        <ul>
          {props.blogs.map(b => <li key={b.id}><Blog blog={b} /></li>)}
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
  null
)(Blogs)