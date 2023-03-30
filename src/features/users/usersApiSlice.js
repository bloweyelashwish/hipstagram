import { apiService } from "../../app/api/apiService";

const usersApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),
    getUsersByLogin: build.query({
      query: (login) => ({
        url: `/users?search=${login}`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),
    followUser: build.mutation({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),
    getFollowersAndFollowings: build.query({
      query: (id) => ({
        url: `/users/followersAndFollowing/${id}`,
        method: "GET",
        providesTags: ["User"],
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersByLoginQuery,
  useFollowUserMutation,
  useGetFollowersAndFollowingsQuery,
} = usersApiService;
