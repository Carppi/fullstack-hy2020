import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        {users === [] ? null :
          <tbody>
            {users
              .sort((a, b) => b.likes - a.likes)
              .map(user =>
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}

          </tbody>
        }
      </table>
    </div>
  )
}

export default Users