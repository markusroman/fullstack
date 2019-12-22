import React from 'react';

const Country = ({data}) => {
    const languages = [...data.languages]
    return (
        <div>
            <h1>{data.name}</h1>
            <p>capital {data.capital}</p>
            <p>population {data.population}</p>
            <h2>languages</h2>
            <ul>{languages.map(element => <li key={element.name} >{element.name}</li>)}</ul>
            <img src={data.flag} alt={`${data.name} flag`} width={300} height={150} />
        </div>

    )
}

export default Country;