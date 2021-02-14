import React, { useEffect, useState } from 'react'
import {
  useParams
} from 'react-router-dom'

import userService from '../services/users'

const User = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default User