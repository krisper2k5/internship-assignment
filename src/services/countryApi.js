import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () =>
        "all?fields=name,flags,population,region,capital,subregion,languages,currencies,borders,translations,borders",
    }),
    getCountryByCode: builder.query({
      query: (code) => {
        if (!code) throw new Error("Country code is required");
        return `alpha/${code}?fields=name,flags,population,region,capital,subregion,languages,translations,borders`;
      },
    }),
  }),
});

export const { useGetAllCountriesQuery, useGetCountryByCodeQuery } = countryApi;
