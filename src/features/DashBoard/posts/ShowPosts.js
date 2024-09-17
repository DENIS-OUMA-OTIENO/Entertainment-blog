import React from 'react'
import Post from './Post'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetPostsQuery } from './postsApiSlice';

const ShowPosts = () => {
    const {data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    let content
    if(isLoading) content = <p>Loading...</p>

    if(isError){
        content = <p>{error?.data?.message}</p>
    }

    let tableContent
    if(isSuccess){
        const { ids } = posts
        tableContent = ids.length ?
        ids.map(postId => <Post postId={postId} />) : null
    }
    content = (
        <React.Fragment>
        <Table size="small" sx={{ backgroundColor: '#fff', }}>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase', }}>
              <TableCell >Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Edit</TableCell>
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

export default ShowPosts



