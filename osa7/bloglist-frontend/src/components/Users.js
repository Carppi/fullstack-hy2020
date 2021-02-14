import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  const Td = ({ children, to }) => { //source https://stackoverflow.com/questions/35565012/react-router-using-link-as-clickable-data-table-row
    // Conditionally wrapping content into a link
    const ContentTag = to ? Link : 'div'

    return (
      <TableCell>
        <ContentTag to={to}>{children}</ContentTag>
      </TableCell>
    )
  }

  return (
    <div>
      <h3>Users</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          {users === [] ? null :
            <TableBody>
              {users
                .sort((a, b) => b.likes - a.likes)
                .map(user =>
                  <TableRow key={user.id}>
                    <Td to={`/users/${user.id}`}>{user.name}</Td>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                )}

            </TableBody>
          }
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users