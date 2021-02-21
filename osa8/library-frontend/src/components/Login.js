import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const user = await login({ variables: { username, password } })

    props.setCurrentUser(user)

    /*setUsername('')
    setPassword('')*/
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login