
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ME, ALL_BOOKS, BOOK_ADDED } from './queries'
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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`New book added to server: ${addedBook.title} by ${addedBook.author.name}`)
      updateCacheWith(addedBook)
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
        updateCacheWith={updateCacheWith}
      />

      <Recommendations
        show={page === 'recommendations'}
        genre={currentUser.favoriteGenre}
      />

    </div>
  )
}

export default App