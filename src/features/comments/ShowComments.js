import React from 'react'
import { useGetCommentsQuery } from './commentApiSlice'
import { useParams } from 'react-router-dom'
import { useGetPostsQuery } from '../DashBoard/posts/postsApiSlice'
import Comment from './Comment'

const ShowComments = () => {

    const { category, slug } = useParams()

    const {data: comments, 
        isSuccess,
        isLoading: isCommentsLoading
    } = useGetCommentsQuery()

    const { post, isLoading: isPostsLoading } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.ids
            .map(id => data.entities[id])
            .find(post => post.slug === slug && post.category === category)
        })
    })
    const postId = post?.id
        
    if(isCommentsLoading || isPostsLoading) return <p>Loading comments...</p>

    let divContent = null
    if(isSuccess && postId ) {
        const filteredComments = comments?.ids
        .filter(id => comments.entities[id].postId === postId)
        .map(commentId => <Comment key={commentId} commentId={commentId} />)
        divContent = filteredComments.length > 0 ? filteredComments : <p>No comments yet.</p>
    }
  return <div>{divContent}</div>
}

export default ShowComments