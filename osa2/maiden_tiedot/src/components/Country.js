import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({country_data}) => {
    const languages = [...country_data.languages]
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
          .get(`http://api.apixu.com/v1/current.json?key=f83e894e97624aea833145251191308&q=${country_data.capital}`
          )
          .then(response => {
            setWeather(response.data);
          });
    }, []);

    console.log(country_data, weather)
    return (
        <>
            {weather.current === undefined ? (
                <p>not rendered yet</p>
            ) : (
                <>
                    <h1>{country_data.name}</h1>
                    <p>capital {country_data.capital}</p>
                    <p>population {country_data.population}</p>

                    <h3>languages</h3>
                    <ul>{languages.map(element => <li key={element.name} >{element.name}</li>)}</ul>

                    <img src={country_data.flag} alt={`${country_data.name} flag`} width={300} height={150} />

                    <h3>weather in {country_data.capital}</h3>
                    <h5>temperature: {weather.current.temp_c} Celsius</h5>
                    <img src={`https:${weather.current.condition.icon}`} alt="current weather icon" />
                    <h5>wind: {weather.current.wind_kph} kph direction {weather.current.wind_dir}</h5>
                </>
            )}
        </>
    )
}

export default Country;