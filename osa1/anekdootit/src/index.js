import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Anecdote = ({anecdotes, index, votearray}) => {
    let new_index = 0
    if(index !== -1){new_index = index}
    return (
    <div>
        <p>{anecdotes[new_index]}</p>
        <p>has {votearray[new_index]} votes</p>
    </div>
    )
}

const vote = (votearray, selected, setMax, setArray) => {
        let index = 0
        let curr_max = 0
        for (let i = 0; i < votearray.length; i++){
            if(votearray[i] > curr_max){
                curr_max = votearray[i]
                index = i
            }
        }
        setMax(index)
        changeArray(votearray, setArray, selected)
    
}

const changeArray = (votearray, setArray, index) => {
    const copy = [...votearray]
    copy[index] += 1
    setArray(copy)
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [rand, setRandom] = useState(0)
    const [max_index, setMax] = useState(0)
    const [votearray, setArray] = useState([0,0,0,0,0,0])
    const length = 6
    const onClick = () => {
        setRandom(Math.floor(Math.random() * length))
        setSelected(rand)
    }
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdotes={props.anecdotes} index={selected} votearray={votearray} />
            <button onClick={() => vote(votearray, selected, setMax.bind(this), setArray.bind(this))} >Vote</button>
            <button onClick={() => onClick()} >Next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdotes={props.anecdotes} index={max_index} votearray={votearray} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)