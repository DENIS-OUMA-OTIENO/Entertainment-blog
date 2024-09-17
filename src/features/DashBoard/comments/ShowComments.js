import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetCommentsQuery } from '../../comments/commentApiSlice';
import Comment from './Comment';

const ShowComments = () => {
    const {data: comments, 
        isSuccess, 
        isLoading,
        isError,
        error
    } = useGetCommentsQuery()

    let content
    if(isLoading) content = <p>Loading...</p>

    if(isError){
        content = <p>{error?.data?.message}</p>
    }

    let tableContent
    if(isSuccess){
        const { ids } = comments
        tableContent = ids.length ?
        ids.map(commentId => <Comment commentId={commentId} />) : null
    }
    content = (
        <React.Fragment>
        <Table size="small" sx={{ backgroundColor: '#fff' }}>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase',  }}>
           
              <TableCell>Comment</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Delete</TableCell>
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

export default ShowComments







    




