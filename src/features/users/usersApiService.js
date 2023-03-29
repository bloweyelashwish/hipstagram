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
  }),
});

export const { useGetUserByIdQuery } = usersApiService;
