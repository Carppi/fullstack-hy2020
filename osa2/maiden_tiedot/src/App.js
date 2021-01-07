import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterValue, filterFunction }) => (
  <div>
    find countries <input value={filterValue} onChange={filterFunction} />
  </div>
)

const Countries = ({ countries, filter, setNewFilter }) => {

  const countriesToShow = (
    countries.filter(country => (
      country
        .name.toLowerCase()
        .includes(filter.toLowerCase())
    )
    )
  )

  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <CountryList countriesToShow={countriesToShow} setNewFilter={setNewFilter}/>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <CountryDetailed country={countriesToShow[0]} />
    )
  } else {
    return (
      <div>No matches, specify another filter</div>
    )
  }


}

const CountryList = ({countriesToShow, setNewFilter}) => {
  return (
    <table>
      <tbody>
        {countriesToShow.map(country => (
          <CountryShort country={country} key={country.alpha3Code} setNewFilter={setNewFilter}/>
        ))}
      </tbody>
    </table>
  )
}

const CountryShort = ({ country, setNewFilter }) => {
  
  const handleClick = () => {
    console.log('Button clicked in ',country.name)
    setNewFilter(country.name)
  }

  return (
    <tr>
      <td>
        {country.name}
      </td>
      <td>
        <button onClick={handleClick}>
          show
        </button>
      </td>
    </tr>
  )
}

const CountryDetailed = ({ country }) => {
  
  return (
    <div>
      <h2>{country.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>population</td>
            <td>{country.population}</td>
          </tr>
        </tbody>
      </table>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        width="50%" height="50%"
      />
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Country finder</h1>
      <Filter filterValue={filter} filterFunction={handleFilter} />
      <Countries countries={countries} filter={filter} setNewFilter={setNewFilter}/>
    </div>
  );
}

export default App;
