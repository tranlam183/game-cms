import { createSlice, current } from "@reduxjs/toolkit";
import { postRacetrack, getRacetrack } from "./actions";

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
  laps: number;
  models: string[];
}
export interface Param {
  pageIndex: number;
  pageSize: number;
}

export enum DataStatus {
  Idle,
  Loading,
  Succeeded,
  Failed,
}
export interface RacetractState {
  racetrackItems: BodyUrlRacetrack[];
  signatureMsg?: string;
  models: string[];
  params?: Param;
  isFetching?: boolean;
  dataStatus?: DataStatus;
}

const initialState: RacetractState = {
  isFetching: false,
  racetrackItems: [],
  models: ["Nismo", "Honda", "Bugatti", "McLaren"],
  params: {
    pageIndex: 1,
    pageSize: 10,
  },
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
    builder
      .addCase(getRacetrack.fulfilled, (state, action) => {
        state.racetrackItems = action.payload;
      })
      .addCase(postRacetrack.fulfilled, (state, action) => {
        if (action.payload?._id) {
          state.racetrackItems.pop()
          state.racetrackItems.unshift(action.payload);
        }
      });
  },
});

export const { fieldChange } = appSlice.actions;

export default appSlice.reducer;
