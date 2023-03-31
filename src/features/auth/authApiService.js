import { apiService } from "../../app/api/apiService";

const authApiSlice = apiService.injectEndpoints({
  endpoints: (build) => ({
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
    updatePassword: build.mutation({
      query: (formData) => ({
        url: "/auth/updatePassword",
        body: formData,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useUpdatePasswordMutation,
} = authApiSlice;
