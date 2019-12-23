import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({country_data}) => {
    const languages = [...country_data.languages]
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const params = {
            access_key: 'f82e2da83c475e235c07a1004b58fa29',
            query: `${country_data.capital}`,
            units: 'm'
        }

        axios
          .get('http://api.weatherstack.com/current', {params}
          )
          .then(response => {
            setWeather(response.data);
          });
    }, []);

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
                    <h5>temperature: {weather.current.temperature} Celsius</h5>
                    <img src={weather.current.weather_icons} alt="current weather icon" />
                    <h5>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</h5>
                </>
            )}
        </>
    )
}

export default Country;