import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateSlice } from "./types";

const initialState: IInitialStateSlice = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  searchTag: "",
  sortTo: "new",
  firstLaunch: true,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setSearchTag(state, action) {
      state.searchTag = action.payload;
    },
    setSortTo(state, action) {
      state.sortTo = action.payload;
    },
    setFirstLaunch(state) {
      state.firstLaunch = false;
    },
  },
});

export const { setUser, setSearchTag, setSortTo, setFirstLaunch } =
  slice.actions;
export default slice.reducer;
