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
  }),
});

export const { useGetCommentsByPostIdQuery, useCreateCommentMutation } =
  commentsApiSlice;
