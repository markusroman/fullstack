import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    

    if ( props.user === undefined) { 
        return null
    }
 
    const u = props.user
  const getTitle = (blog) => {
    const wanted = props.blogs.find(b => b.id === blog)
      return wanted.title
  }

  return (
    <div>
        <h2>{u.name}</h2>
        
        <h3>Added blogs</h3>
        <ul>
            {u.blogs.map(b => 
                <li key={b.id} >{getTitle(b)}</li>
            )}
        </ul>
    </div>
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
)(User)