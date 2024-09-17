import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    let content
    if(user) {
        content = (
            <TableRow>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
           
          </TableRow>
        )
    }
  return content
}

export default User