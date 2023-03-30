import { apiService } from "../../app/api/apiService";

const postsApiSlice = apiService.injectEndpoints({
  endpoints: (build) => ({
    uploadPost: build.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
        invalidatesTags: ["Post", "User"],
      }),
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
        providesTags: ["Post"],
      }),
    }),
    getFeed: build.query({
      query: () => ({
        url: "/posts/feed",
        method: "GET",
        providesTags: ["Post"],
      }),
    }),
    likePost: build.mutation({
      query: (id) => ({
        url: `/posts/like/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadPostMutation,
  useGetPostByIdQuery,
  useGetFeedQuery,
  useLikePostMutation,
} = postsApiSlice;
