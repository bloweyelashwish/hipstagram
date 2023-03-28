import { apiService } from "../../app/api/apiService";

const usersApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    currentUser: build.query({
      query: () => "users/current",
    }),
  }),
});

export const { useCurrentUserQuery } = usersApiService;
console.log(useCurrentUserQuery);
