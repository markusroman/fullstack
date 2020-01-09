import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  return (
    <>
      <h2>All users</h2>

      <ul>
        {props.users.map(u => 
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.username}</Link> {u.blogs.length}
          </li>
        )}
      </ul>
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