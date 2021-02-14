import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  const Td = ({ children, to }) => { //source https://stackoverflow.com/questions/35565012/react-router-using-link-as-clickable-data-table-row
    // Conditionally wrapping content into a link
    const ContentTag = to ? Link : 'div'

    return (
      <td>
        <ContentTag to={to}>{children}</ContentTag>
      </td>
    )
  }

  return (
    <div>
      <h3>Users</h3>
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
                  <Td to={`/users/${user.id}`}>{user.name}</Td>
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