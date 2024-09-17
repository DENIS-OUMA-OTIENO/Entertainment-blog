import React from 'react'
import { useSelector } from 'react-redux'
import { selectCommentById } from './commentApiSlice'
import { formatDistanceToNow } from 'date-fns'

const Comment = ({ commentId }) => {
    const comment = useSelector(state => selectCommentById(state, commentId))
    
    let content
    if(comment){
        const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
        content = (
            <div>
                <p><strong>@{comment.username}</strong>
                <span style={{ paddingLeft: '10px', color: 'GrayText'}}>{timeAgo}</span></p>
                <p>{comment.content}</p>
                             
            </div>
        )
    }

  return content
}

export default Comment