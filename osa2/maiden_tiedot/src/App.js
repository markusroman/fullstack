import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

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

  const handleClick = (data) => {
    return (
      <>
        <Country data={data} />
      </>
    )
  }

  return (
    <div>
      <Filter handleFilter={handleFilter}/>
      <Countries data={data} filter={filter} handleClick={handleClick} />
    </div>
  )
};

export default App;
