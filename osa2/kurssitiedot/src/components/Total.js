import React from 'react'

const Total = ({parts}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let excercises = [...parts]
    for (let i = 0; i < parts.length; i++){
        excercises[i] = parts[i].exercises
    }
    const tot = excercises.reduce(reducer)
    return (
        <>
            <p>total of {tot} excercises</p>
        </>
    )
};

export default Total