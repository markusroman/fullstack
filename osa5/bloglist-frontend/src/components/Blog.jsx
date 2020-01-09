import React from 'react'
import { likeBlog, delBlog } from "../reducers/blogReducer"
import { setMessage } from "../reducers/notificationReducer"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import Comments from './Comments'
import { Table, Button } from 'semantic-ui-react'

const BlogNoHistory = (props) => {
  if(props.blog === undefined){
    return <p>Still loading</p>
  }

  const blog = props.blog

  const removeBlog = (event) => {
    event.preventDefault()
    props.delBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} removed!`, 5)
    props.history.push("/")
  }

  const onLikeClick = (event) => {
    event.preventDefault()
    props.likeBlog(blog)
    props.setMessage(`Blog "${blog.title}" by ${blog.author} liked!`, 5)
  }

  const removeButton = () => {
    if(props.user === null){
      return null
    }
    if (blog.user.username === props.user.username){
      return <Button type='button' id={blog.id} onClick={removeBlog} >remove</Button>
    } else {
      return null
    }
  }

  return (
    <>
      <div>
        <Table striped celled>
        <Table.Body>
          <Table.Row key={"URL"}>
              <Table.Cell>
                <p>More info</p>
              </Table.Cell>
              <Table.Cell>
                <a href={blog.url}>{blog.url}</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row key={"AUTHOR"}>
              <Table.Cell>
                <p>Author</p>
              </Table.Cell>
              <Table.Cell>
                {blog.author}
              </Table.Cell>
            </Table.Row>
            <Table.Row key={"LIKES"}>
              <Table.Cell>
                <p>Likes</p>
              </Table.Cell>
              <Table.Cell data-cy="blog-likes" >
                {blog.likes}<Button data-cy="like-button" type="button" id={blog.title} onClick={onLikeClick} >like</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row key={"USER"}>
              <Table.Cell>
                <p>Added by</p>
              </Table.Cell>
              <Table.Cell>
                {blog.user.username}
              </Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
      {removeButton()}
    </div>
      <Comments blog={blog} />
    </>
  )
}

const mapDispatchToProps = {
  likeBlog,
  delBlog,
  setMessage
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const Blog = withRouter(BlogNoHistory)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)