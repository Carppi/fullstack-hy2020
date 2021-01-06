import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Grace Hopper' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const nameArray = persons.map(person => person.name)
    
    //tarkista onko lisättävä nimi sovelluksen tiedossa
    if (nameArray.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`) //jos nimi löytyy, anna virheilmoitus komennolla alert
    } else { 
      //jos ei, lisää tiedostoon
      const personObject = {
        name: newName
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map((person) => {
        return <li key={person.name}>{person.name}</li>
      })}
      </ul>
      <h2>debugging:</h2>
      <div>debug: newName is {newName}</div>
    </div>
  )

}

export default App
