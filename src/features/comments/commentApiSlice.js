import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const commentsAdapter = createEntityAdapter({})
const initialState = commentsAdapter.getInitialState()

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComments: builder.query({
            query: () => '/comment',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
    
            transformResponse: responseData => {
                const loadedComments = responseData.map(comment => {
                    comment.id = comment._id
                    return comment
                })
                return commentsAdapter.setAll(initialState, loadedComments)
            },
    
            providesTags: (result, arg, error) => {
                if(result?.ids){
                    return [
                        { type: 'Comment', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Comment', id }))
                    ]
                } else {
                    return [{ type: 'Comment', id: 'LIST' }]
                }
            }
        }),

        createComment: builder.mutation({
            query: initialData => ({
                url: '/comment',
                method: 'POST',
                body: { ...initialData },
            }),
            invalidatesTags: [
                { type: 'Comment', id: 'LIST' }
            ]
        }),
        
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: '/comment',
                method: 'DELETE',
                body: { id }

            }), 
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'Comment', id: arg.id }]
            }
        })
    })
})

export const { useCreateCommentMutation, useGetCommentsQuery, useDeleteCommentMutation } = commentApiSlice

export const selectCommentsResult = commentApiSlice.endpoints.getComments.select()

const selectCommentsData = createSelector(
selectCommentsResult,
commentsResult => commentsResult.data
)

export const {
selectAll: selectAllComments,
selectById: selectCommentById,
selectIds: selectCommentIds
} = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? initialState)









   