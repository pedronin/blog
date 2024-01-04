import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IComment,
  RemovePostMutate,
  CreateCommentMutate,
  UpdatePostMutate,
  IPost,
  TypeTags,
  IInfoComment,
  UploadImageResponse,
  AddNewPostMutate,
  NewUserMutate,
  LoginUserMutate,
  GetAllPostParams,
} from "./types";
import { SERVER_URL } from "../env";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Posts", "Post", "Comment"],
  endpoints: (builder) => ({
    getMe: builder.query<TypeTags, NewUserMutate>({
      query: () => ({
        url: "/auth/me",
      }),
    }),
    newUser: builder.mutation<TypeTags, NewUserMutate>({
      query: (infoUser) => ({
        url: "/auth/register",
        method: "POST",
        body: infoUser,
      }),
    }),
    loginUser: builder.mutation<TypeTags, LoginUserMutate>({
      query: (infoUser) => ({
        url: "/auth/login",
        method: "POST",
        body: infoUser,
      }),
    }),

    getAllTags: builder.query<TypeTags, string>({
      query: () => ({
        url: "/posts/tags",
      }),
    }),
    getAllPost: builder.query<IPost[], GetAllPostParams>({
      query: ({ tag, sortTo }) =>
        `/posts?sortTo=${sortTo}${tag ? `&tag=${tag}` : ""}`,
      providesTags: ["Posts"],
    }),
    getOnePost: builder.query<IPost, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Post"],
    }),
    uploadImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: `/upload`,
        method: "POST",
        body: formData,
      }),
    }),
    addNewPost: builder.mutation<IPost, AddNewPostMutate>({
      query: ({ token, infoPost }) => ({
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
        url: "/posts",
        method: "POST",
        body: infoPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    removePost: builder.mutation<unknown, RemovePostMutate>({
      query: ({ _id, token }) => ({
        url: `/posts/${_id}`,
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<IPost, UpdatePostMutate>({
      query: ({ _id, token, infoPost }) => ({
        url: `/posts/${_id}`,
        method: "PATCH",
        body: infoPost,
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }),
      invalidatesTags: ["Posts"],
    }),

    createComment: builder.mutation<IInfoComment, CreateCommentMutate>({
      query: ({ infoComment, token }) => ({
        url: `/comments`,
        method: "POST",
        body: infoComment,
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }),
      invalidatesTags: ["Comment"],
    }),
    getComments: builder.query<IComment[], string>({
      query: (postId) => ({
        url: `/comments/${postId}`,
      }),
      providesTags: ["Comment"],
    }),
  }),
});
