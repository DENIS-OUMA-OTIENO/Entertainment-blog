import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostsQuery } from '../DashBoard/posts/postsApiSlice'
import NewCommentForm from './NewCommentForm'

const NewComment = () => {
    const { category, slug } = useParams()

    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.ids 
            .map(id => data.entities[id])
            .find(post => post.category === category && post.slug === slug)
        })
    })

    let content
    if(!post){
        content = <p>post loading...</p>
    } else {
        content = <NewCommentForm key={post} post={post} />
    }

    return content
}

export default NewComment