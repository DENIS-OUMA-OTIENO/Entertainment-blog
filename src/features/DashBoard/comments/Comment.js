import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { selectCommentById, useDeleteCommentMutation } from '../../comments/commentApiSlice';


const Comment = ({ commentId }) => {
    const comment = useSelector(state => selectCommentById(state, commentId))

    const [deleteComment, 
        isSuccess,
        isLoading,
        isError,
        error
    ] = useDeleteCommentMutation()
    const dateCreated = new Date(comment.createdAt).toLocaleString()


    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(isSuccess){
            navigate('/dash/comments')
        }
    }, [isSuccess, navigate])

    const handleDeleteClick = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleConfirmDeleteClick = async() => {
      await deleteComment({ id: comment.id })  
      setOpen(false)    
    }

    let content

  

    if(isLoading) content = <p>Deleting comment</p>
    if(isError) content = <p>{error?.data?.message}</p>
    if(comment) {
        content = (
            <TableRow>
            <TableCell>{comment.content}</TableCell>
            <TableCell>{comment.postId}</TableCell>
            <TableCell>{comment.username}</TableCell>
            <TableCell sx={{ maxWidth: 40 }}>{dateCreated}</TableCell>
            
            <TableCell>
            <Button
              variant="outlined" color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}>
              Delete
              </Button>
              
            </TableCell>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                 <DialogContentText>
                   Are you sure you want to delete this comment? This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                 <Button
                  variant="outlined" color="success" 
                  onClick={handleClose} 
                  >
                    Cancel
                 </Button>
                 <Button 
                 variant="contained" color="error" 
                 onClick={handleConfirmDeleteClick} 
                 >
                    Delete
                 </Button>
                </DialogActions>
             </Dialog>
            
          
          </TableRow>
        )
    }
  return content
  
}

export default Comment



