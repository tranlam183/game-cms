import { createSlice } from "@reduxjs/toolkit";
import { RacetrackCR } from "./actions";

export interface BodyAuth {
  wallet: string;
  signature: string;
}

export interface AppState {
  racetrackItems?: string[];
  signatureMsg?: string;
}

const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(RacetrackCR.pending, (state,action) => {
        state.racetrackItems = action.payload;
      });
  },
});

export default appSlice.reducer;
