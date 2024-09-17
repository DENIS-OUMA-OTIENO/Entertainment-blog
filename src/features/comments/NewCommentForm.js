import React, { useEffect, useState } from 'react'
import useAuth from '../users/hooks/useAuth'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { useCreateCommentMutation } from './commentApiSlice'

const NewCommentForm = ({ post }) => {

    const { username } = useAuth()
    
    const postId = post.id

    const [createComment, {
        isSuccess,
        isLoading,
        isError,
        error
    }] = useCreateCommentMutation()

    const [content, setContent ] = useState('')

    const onContentChange = e => setContent(e.target.value)
    
    const canSave = username && content && postId

    if(isLoading) <p>Saving comment...</p>
    if(isError) <p>{error?.data?.message}</p>
    useEffect(() => {
        if(isSuccess){
            setContent('')
        }
    }, [isSuccess])

    const onSaveCommentClicked = async(e) => {
        e.preventDefault()
        if(canSave){
            try {
                await createComment({ content, username, postId })
            } catch (error) {
                console.log(error)                
            }
        }
    }


    
  return (
    <div>
        <TextareaAutosize
        value={content}
        onChange={onContentChange}
        minRows={3}
        placeholder="Write your comment here..."
        style={{ width: '100%' }}
      />
      <Button
      onClick={onSaveCommentClicked}
      disabled={!canSave}
      sx={{ marginLeft: 'auto' }}
      >Save comment</Button>
    </div>
  )
}

export default NewCommentForm