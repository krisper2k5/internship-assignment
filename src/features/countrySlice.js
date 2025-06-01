import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  regionFilter: null,
  sortBy: null,
  language: localStorage.getItem("language") || "en",
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setRegionFilter: (state, action) => {
      state.regionFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setSearchTerm, setRegionFilter, setSortBy, setLanguage } =
  countrySlice.actions;
export default countrySlice.reducer;
