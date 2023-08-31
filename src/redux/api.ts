import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComment, IPost, TypeTags, IInfoPost, IInfoComment, IInfoUser } from './types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-ys3l.onrender.com' }),
  tagTypes: ['Posts', 'Post', 'Comment'],
  endpoints: (builder) => ({
    getMe: builder.query<TypeTags, IInfoUser>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
    newUser: builder.mutation<TypeTags, IInfoUser>({
      query: (infoUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: infoUser,
      }),
    }),
    loginUser: builder.mutation<TypeTags, { email: string; password: string }>({
      query: (infoUser) => ({
        url: '/auth/login',
        method: 'POST',
        body: infoUser,
      }),
    }),

    getAllTags: builder.query<TypeTags, string>({
      query: () => ({
        url: '/posts/tags',
      }),
    }),
    getAllPost: builder.query<IPost[], { tag: string; sortTo: string }>({
      query: ({ tag, sortTo }) => `/posts?sortTo=${sortTo}${tag ? `&tag=${tag}` : ''}`,
      providesTags: ['Posts'],
    }),
    getOnePost: builder.query<IPost, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: ['Post'],
    }),
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: `/upload`,
        method: 'POST',
        body: formData,
      }),
    }),
    addNewPost: builder.mutation<IPost, { token: string; infoPost: IInfoPost }>({
      query: ({ token, infoPost }) => ({
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
        url: '/posts',
        method: 'POST',
        body: infoPost,
      }),
      invalidatesTags: ['Posts'],
    }),
    removePost: builder.mutation<unknown, { _id: string; token: string }>({
      query: ({ _id, token }) => ({
        url: `/posts/${_id}`,
        method: 'DELETE',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation<IPost, { _id: string; token: string; infoPost: IInfoPost }>({
      query: ({ _id, token, infoPost }) => ({
        url: `/posts/${_id}`,
        method: 'PATCH',
        body: infoPost,
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      }),
      invalidatesTags: ['Posts'],
    }),

    createComment: builder.mutation<
      IInfoComment,
      { infoComment: { postId: string; text: string }; token: string }
    >({
      query: ({ infoComment, token }) => ({
        url: `/comments`,
        method: 'POST',
        body: infoComment,
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      }),
      invalidatesTags: ['Comment'],
    }),
    // createComment: builder.mutation<IInfoComment, {infoComment: { postId: string, text: string },  token: string}>({
    //   query: ({infoComment,  token}) => ({
    //     url: `/posts/comment/${infoComment.postId}`,
    //     method: 'put',
    //     body: infoComment,
    //     headers: new Headers({
    //       Authorization: 'Bearer ' + token,
    //     }),
    //   }),
    //   invalidatesTags: ["Post"]
    // }),
    getComments: builder.query<IComment[], string>({
      query: (postId) => ({
        url: `/comments/${postId}`,
      }),
      providesTags: ['Comment'],
    }),
  }),
});
