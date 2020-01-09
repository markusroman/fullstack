import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from "semantic-ui-react"

const Users = (props) => {
  return (
    <>
      <h2>All users</h2>
      <Table data-cy="users-table" striped celled>
      <Table.Body>
        <Table.Row key={"HEADER"}>
            <Table.Cell>
              <p>Username</p>
            </Table.Cell>
            <Table.Cell>
              <p>Blogs added by user</p>
            </Table.Cell>
          </Table.Row>
        {props.users.map(u =>
          <Table.Row key={u.id}>
            <Table.Cell>
              <Link to={`/users/${u.id}`}>{u.username}</Link>
            </Table.Cell>
            <Table.Cell>
              {u.blogs.length}
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
    users: state.users,
  }
}
  
export default connect(
  mapStateToProps,
  null
)(Users)