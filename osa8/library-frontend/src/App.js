
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ME, BOOK_ADDED } from './queries'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ME)

  useEffect(() => {
    if(!result.loading && result.data && result.data.me) {
      const user = result.data.me
      setCurrentUser(user)
    }
  }, [result])

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  },[])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book added to server: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`)
    }
  })

  if (!currentUser || !token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />

        <Login
          show={page === 'login'}
          setToken={setToken}
          setCurrentUser={setCurrentUser}
          setPage={setPage}
        />

      </div>
    )
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={() => {
          logout()
          setPage('authors')
        }
        }>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        currentUser={currentUser}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
        genre={currentUser.favoriteGenre}
      />

    </div>
  )
}

export default App