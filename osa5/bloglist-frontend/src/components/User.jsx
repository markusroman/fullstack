import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    

    if ( props.user === undefined) { 
      return <p>Still loading</p>
    }
 
  const u = props.user

  return (
    <div>
      <h2>{u.username}</h2>

      {
        u.blogs.length === 0 ?
          <p>User hasn't added any blogs</p>
          :
          <>
            <h3>Added blogs</h3>
            <ul>
              {u.blogs.map(b => 
                <li key={b.id} >{b.title}</li>
              )}
            </ul>
          </>
      }
        
        
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