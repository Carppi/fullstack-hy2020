import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({ filterValue, filterFunction }) => (
  <div>
    filter shown with <input value={filterValue} onChange={filterFunction} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter, setPersons, setNewNotification }) => {

  const personsToShow = (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <table>
      <tbody>
        {personsToShow.map((person) => (
          <Person
            person={person}
            key={person.name}
            persons={persons}
            setPersons={setPersons}
            setNewNotification={setNewNotification}
          />
        )
        )}
      </tbody>
    </table>
  )
}

const Person = ({ person, persons, setPersons, setNewNotification }) => {

  const deletePerson = () => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNewNotification({
            message: `${person.name} was deleted`,
            positive: true
          })
          setTimeout(() => {
            setNewNotification(null)
          },5000)
        })
    }

  }


  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={deletePerson}>
          delete
        </button>
      </td>
    </tr>
  )
}

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.positive) {
    return (
      <div className="notification">
        {notification.message}
      </div>
    )
  } else {

    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNewNotification] = useState({
    message: 'some notification happened...',
    positive: true
  }
  )

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameArray = persons.map(person => {
      return person.name.toLowerCase()
    })

    //tarkista onko lisättävä nimi sovelluksen tiedossa
    if (nameArray.includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one (${newNumber})?`)) {
        const existingPerson = persons.find(p => p.name === newName)
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNewNotification({
              message: `Phone number of ${returnedPerson.name} was updated to ${returnedPerson.number}`,
              positive: true
            })
            setTimeout(() => {
              setNewNotification(null)
            },5000)
          })
          .catch(error => {
            console.log('error',error)
            console.log('existingPerson',existingPerson)
            setNewNotification({
              message: `${existingPerson.name} was already removed from the server`,
              positive: false
            })
            setTimeout(() => {
              setNewNotification(null)
            },5000)
          })

      }
    } else {
      //jos ei, lisää tiedostoon
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log(returnedPerson)
          setNewName('')
          setNewNumber('')
          setNewNotification({
            message: `${returnedPerson.name} was added`,
            positive: true
          })
          setTimeout(() => {
            setNewNotification(null)
          },5000)
        })

    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterValue={filter} filterFunction={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setNewNotification={setNewNotification}
      />
    </div>
  )

}

export default App
