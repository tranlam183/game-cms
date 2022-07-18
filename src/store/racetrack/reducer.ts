import { createSlice, current } from "@reduxjs/toolkit";
import { RacetrackCreate, RacetrackGet } from "./actions";

export interface BodyAuth {
  wallet: string;
  signature: string;
}
export interface BodyUrlRacetrack {
  name: string;
  description: string;
  image: string;
  background: string;
  timeReq: number;
  labs: number;
  models: string[];
}
export interface Param {
  pageIndex: number;
  pageSize: number;
}

export interface RacetractState {
  racetrackItems: BodyUrlRacetrack[];
  signatureMsg?: string;
  models: string[];
  params?: Param;
}

const initialState: RacetractState = {
  racetrackItems:[],
  models: ["Nismo", "Honda", "Bugatti", "McLaren"],
  params: {
    pageIndex:1,
    pageSize:10,
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fieldChange(state, action) {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RacetrackGet.fulfilled, (state, action) => {
      // state.racetrackItems.unshift(action.payload)
      state.racetrackItems= action.payload
    });
  },
});

export const { fieldChange } = appSlice.actions;

export default appSlice.reducer;
