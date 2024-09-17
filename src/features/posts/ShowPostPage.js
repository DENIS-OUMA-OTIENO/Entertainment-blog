import React from 'react'
import { useGetPostsQuery } from '../DashBoard/posts/postsApiSlice'
import PostPage from './PostPage'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { useParams } from 'react-router-dom'

const ShowPostPage = () => {
    // const postId = useSelector(state => state.post.postId)
    const { category, slug } = useParams()
  
    const { post } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data }) => ({
            post: data?.ids
            .map(id => data.entities[id])
            .find(post => post.slug === slug && post.category === category)
        })
    })
        
    let content
    if(!post){ 
        content = (
        <Box>
            <Skeleton variant="rectangular" height={300} /> 
            <Skeleton variant="text" height={40} width="80%" /> 
            <Skeleton variant="text" height={20} width="100%" /> 
            <Skeleton variant="text" height={20} width="100%" /> 
        </Box>)
    } else {
    content = <PostPage post={post}/>
    }

  return content
}

export default ShowPostPage

