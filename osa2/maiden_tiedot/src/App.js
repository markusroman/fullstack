import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [ data, setData ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, []);

  const handleFilter = (newFilter) => {
    setFilter(newFilter)
  };

  const handleClick = (country_data) => {
    setFilter(country_data.name)
  }

  return (
    <div>
      <Filter handleFilter={handleFilter}/>
      <Countries data={data} filter={filter} handleClick={handleClick} />
    </div>
  )
};

export default App;
