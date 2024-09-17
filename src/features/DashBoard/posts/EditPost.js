import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { useGetPostsQuery } from './postsApiSlice';
import { useSelector } from 'react-redux';
import EditPostForm from './EditPostForm';

const EditPost = () => {

    const postId = useSelector(state => state.post.postId)

    const { post } = useGetPostsQuery('postsList', {
      selectFromResult: ({ data }) => ({
        post: data?.entities[postId]
      })
    })

    let content
   if(!post) {
    content = <p>Loading...</p>
   } else {
    content = <EditPostForm post={post} />
   }
  
    
  return content

}

export default EditPost


