import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { selectPostById, useDeletePostMutation } from './postsApiSlice';
import { useNavigate } from 'react-router-dom';
import { setPostId } from '../posts/postSlice';

const Post = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    const [deletePost, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useDeletePostMutation()
    const dispatch = useDispatch()

    const dateCreated = new Date(post.createdAt).toLocaleString()
    const dateUpdated = new Date(post.updatedAt).toLocaleString()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    useEffect(() => {
      dispatch(setPostId(postId))
    },[dispatch, postId])

    useEffect(() => {
      if(isSuccess){
        navigate('/dash/posts')
      }
    },[isSuccess, navigate])

    const handleEditClick = () => {
      dispatch(setPostId(postId))
      navigate(`/dash/posts/${post.slug}`)
    }

    const handleDeleteClick = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleConfirmDeleteClick = async() => {
      dispatch(setPostId(postId))
      await deletePost({ id: post.id })  
      setOpen(false)    
    }

    let content

  
    const isImage = (url) => {
      return /\.(jpeg|jpg|gif|png|avif)$/.test(url)
    }
    if(isLoading) content = <p>Deleting post</p>
    if(isError) content = <p>{error?.data?.message}</p>
    if(post) {
        content = (
            <TableRow>
            <TableCell>
              {isImage(post.imageVideoUrl) ? (
                <img 
                src={post.imageVideoUrl}
                alt={post.title}
                style={{ 
                  width: '100px', 
                  height: '100px'
                }}
              
                />
              ) :
              (
                <video
                // controls
                style={{ 
                  maxWidth: '100px', 
                  height: 'auto' 
                }}
                >
                <source src={post.imageVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              )}
            
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell sx={{ maxWidth: 40 }}>{dateCreated}</TableCell>
            <TableCell sx={{ maxWidth: 40 }}>{dateUpdated}</TableCell>
            
            <TableCell>
              <Button
              variant="outlined" color="success"
              startIcon={<EditIcon />}
              onClick={handleEditClick}>
              Edit
              </Button>
            </TableCell>
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
                   Are you sure you want to delete this post? This action cannot be undone.
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

export default Post