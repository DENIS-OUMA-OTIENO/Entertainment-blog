import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ShowUsers = () => {

    const {data: users, 
        isLoading,
        isSuccess,
        isError,
        error        
    } = useGetUsersQuery()

    let content
    if(isLoading) content = <p>Loading...</p>

    if(isError){
        content = <p>{error?.data?.message}</p>
    }

    let tableContent
    if(isSuccess){
        const { ids } = users
        const filteredUsers = ids
        .filter(id => users.entities[id].username !== 'ominoobwos24')
        .map(userId => <User userId={userId} />) 
        tableContent = filteredUsers
    }
    content = (
        <React.Fragment>
        <Table size="small" sx={{ backgroundColor: '#fff', }}>
          <TableHead sx={{ textTransform: 'uppercase', fontWeight: 'bold'}}>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
          {tableContent}
          </TableBody>
        </Table>

        
      </React.Fragment>
      
    )
  return content
}

export default ShowUsers