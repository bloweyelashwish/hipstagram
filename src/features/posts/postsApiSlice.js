import { apiService } from "../../app/api/apiService";

const postsApiSlice = apiService.injectEndpoints({
  endpoints: (build) => ({
    uploadPost: build.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUploadPostMutation, useGetPostByIdQuery } = postsApiSlice;
