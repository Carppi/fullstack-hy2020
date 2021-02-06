import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    handleSubmit(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h3>Login to application</h3>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm