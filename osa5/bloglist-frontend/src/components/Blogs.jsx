import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from "../reducers/blogReducer"
import { Link } from 'react-router-dom'
import { Table } from "semantic-ui-react"

const Blogs = (props) => {
  if (props.blogs.length === 0){
    return <p>No blogs in database</p>
  }
  return (
    <>
      <h2>All blogs</h2>
      <Table data-cy="blogs-table" striped celled>
      <Table.Body>
        <Table.Row key={"HEADER"}>
            <Table.Cell>
              <p>Blog title</p>
            </Table.Cell>
            <Table.Cell>
              <p>Blog likes</p>
            </Table.Cell>
          </Table.Row>
        {props.blogs.map(b =>
          <Table.Row key={b.id}>
            <Table.Cell>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </Table.Cell>
            <Table.Cell>
              {b.likes}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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