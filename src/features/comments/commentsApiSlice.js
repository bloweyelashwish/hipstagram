import { apiService } from "../../app/api/apiService";

const commentsApiSlice = apiService.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (data) => ({
        url: "/comments",
        body: data,
        method: "POST",
      }),
    }),
    getCommentsByPostId: build.query({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "GET",
        providesTags: ["Comment"],
      }),
    }),
    deleteCommentById: build.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
        invalidatesTags: ["Comment"],
      }),
    }),
    editCommentById: build.mutation({
      query: (id, data) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: data,
        invalidatesTags: ["Comment"],
      }),
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useDeleteCommentByIdMutation,
  useEditCommentByIdMutation,
} = commentsApiSlice;
