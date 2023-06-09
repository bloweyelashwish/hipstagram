import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../globals";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

const baseQueryWithStatusCheck = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    result?.error?.originalStatus?.toString().startsWith("4")
  ) {
    toast.error("An error has occured.");
    api.dispatch(logout());
  }
  return result;
};

export const apiService = createApi({
  reducerPath: "apiService",
  keepUnusedDataFor: 5,
  baseQuery: baseQueryWithStatusCheck,
  tagTypes: ["Post", "User", "Feed", "Comment"],
  endpoints: () => ({}),
});
