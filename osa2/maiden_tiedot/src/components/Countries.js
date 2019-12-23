import React from 'react';
import Country from './Country'

const Countries = (props) => {
    let filtered = [...props.data];
    const filterData = (element) => {
        const name = element.name.toUpperCase();
        const filter = props.filter.toUpperCase();
        if ( name.search(filter) !== -1 ){
            return true;
        };
        return false;
    };

    const buttonHandler = (event) => {
        event.preventDefault()
        const func = props.handleClick
        for(let i = 0; i < filtered.length; i++) {
            if (filtered[i].name === event.target.id){
                func(filtered[i])
            }
        }
    }

    const countryHandler = (element) => {
        return (
            <li key={element.name} >
                {element.name} <button type="button" onClick={buttonHandler} id={element.name} >show</button>
            </li>  
        )
            
    }
    if(props.filter !== ''){
        filtered = props.data.filter(filterData);
    };
    if (filtered.length > 10) {
        return ( <div>Too many matches, specify another filter</div> );
    } else if ( filtered.length > 1 ) {
        return (
        <ul>
            {filtered.map(country => countryHandler(country))}
        </ul>
        )
    } else if ( filtered.length === 1 ) {
        return <Country country_data={filtered[0]} />
    }
    return null;
}

export default Countries;