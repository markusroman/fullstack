import React from "react"
import {
    BrowserRouter as Router,
    Route, Link
  } from 'react-router-dom'
import { connect } from "react-redux"
import Blogs from './Blogs'
import Blog from "./Blog"
import Users from "./Users"
import User from "./User"
import { Menu } from "semantic-ui-react"
  
  const menu = (props) => {
    const padding = {
      paddingRight: 5
    }
    return (
        <div>
          <Router>
            <div>
              <Menu inverted>
                <Menu.Item link>
                  <Link style={padding} to="/">blogs</Link>
                </Menu.Item>
                <Menu.Item link>
                  <Link style={padding} to="/users">users</Link>
                </Menu.Item>
              </Menu>
              <Route exact path="/" render={() => <Blogs />} />
              <Route path="/users" render={() => <Users />} />
              <Route exact path="/blogs/:id" render={({ match }) => 
                <Blog blog={props.blogs.find(b => b.id === match.params.id)} />
              } />
              <Route exact path="/users/:id" render={({ match }) => 
                <User user={props.users.find(u => u.id === match.params.id)} />
              } />
            </div>
          </Router>
        </div>
      )
  }

  const mapStateToProps = (state) => {
    return {
      blogs: state.blogs,
      users: state.users
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(menu)