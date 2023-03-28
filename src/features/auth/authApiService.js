import { apiService } from "../../app/api/apiService";

const authApiSlice = apiService.injectEndpoints({
  endpoints: (build) => ({
    currentUser: build.query({
      query: () => ({
        url: "/users/current",
        method: "GET",
      }),
    }),
    login: build.mutation({
      query: (creds) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...creds },
      }),
    }),
    registration: build.mutation({
      query: (formData) => ({
        url: "/auth/registration",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useCurrentUserQuery,
} = authApiSlice;
