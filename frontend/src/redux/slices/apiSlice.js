import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

// async function baseQueryWithAuth(args, api, extra) {
//   const result = await baseQuery(args, api, extra);
//   // Dispatch the logout action on 401.
//   if (result.error && result.error.status === 401) {
//     api.dispatch(logout());
//   }
//   return result;
// }

export const api = createApi({
  baseQuery,
  //tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
