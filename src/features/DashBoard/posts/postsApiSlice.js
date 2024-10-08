import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../../app/api/apiSlice'

const postsAdapter = createEntityAdapter({})
const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/post',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
    
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    post.id = post._id
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            },
    
            providesTags: (result, arg, error) => {
                if(result?.ids){
                    return [
                        { type: 'Post', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else {
                    return [{ type: 'Post', id: 'LIST' }]
                }
            }
        }),

        createPost: builder.mutation({
            query: (formData) => ({
                url: '/post/create',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [
                { type: 'Post', id: 'LIST' }
            ]
        }),
        editPost: builder.mutation({
            query: ({ postId, formData }) => ({
                url: `/post/${postId}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: (result, error, arg) => {
                return[{
                    type: 'Post', id: arg.id
                }]
            }
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: '/post',
                method: 'DELETE',
                body: { id }

            }), 
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Post', id: arg.id }]
            }
        })
    })
})

export const { useGetPostsQuery, useCreatePostMutation, useEditPostMutation, useDeletePostMutation } = postsApiSlice

export const selectPostsResult = postsApiSlice.endpoints.getPosts.select()

const selectPostsData = createSelector(
selectPostsResult,
postsResult => postsResult.data
)

export const {
selectAll: selectAllPosts,
selectById: selectPostById,
selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)









   