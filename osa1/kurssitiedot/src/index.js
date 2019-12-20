import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <div><h1>{props.course}</h1></div>

const Content = (props) => (
    <div>
        <Part first={props.t[0].name} second={props.t[0].exercises} />
        <Part first={props.t[1].name} second={props.t[1].exercises} />
        <Part first={props.t[2].name} second={props.t[2].exercises} />
    </div>
)

const Total = (props) => {
    return (
        props.t[0].exercises + props.t[1].exercises + props.t[2].exercises
    )
}
const Part = (props) => {
    return (
        <div>
            <p>{props.first} {props.second}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

    return (
    <div>
        <Header course={course.name} />
        <Content t={course.parts} />
        <Total t={course.parts} />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))