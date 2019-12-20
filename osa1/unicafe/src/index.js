import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = (props) => { return <p>{props.text} {props.value}</p> }

const Statistics = (props) => {
    if (props.total === 0) { return <div>No feedback given</div> }
    return (
        <table>
            <tbody>
                <tr>
                <td><Statistic text="good" value={props.good} /></td>
                </tr>
                <tr>
                    <td><Statistic text="neutral" value={props.neutral} /></td>
                </tr>
                <tr>
                    <td><Statistic text="bad" value={props.bad} /></td>
                </tr>
                <tr>
                    <td><Statistic text="total" value={props.total} /></td>
                </tr>
                <tr>
                    <td><Statistic text="average" value={props.average} /></td>
                </tr>
                <tr>
                    <td><Statistic text="positive" value={props.positive} /></td>
                </tr>
            </tbody>
        </table>
    )
}

const Button = (props) => (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [tot, setTot] = useState(0)

    const handleGood = newValue => {
      setGood(newValue)
      setTot(tot + 1)
    }
    const handleNeutral = newValue => {
      setNeutral(newValue)
      setTot(tot + 1)
    }
    const handleBad = newValue => {
      setBad(newValue)
      setTot(tot + 1)
    }

    const Average = () => {
        if (tot === 0) {
            return 0
        }   
        return ( good - bad ) / tot
    }

    const Positive = () => {
        if (tot === 0) {
            return 0
        }   
        return  ( ( good / tot ) * 100 ) + " %"
    }
  return (
    
    <div>
        <h1>give feedback</h1>
        <Button handler={() => handleGood(good + 1)} text="good"/>
        <Button handler={() => handleNeutral(neutral + 1)} text="neutral"/>
        <Button handler={() => handleBad(bad + 1)} text="bad"/>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} total={tot} average={Average()} positive={Positive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)