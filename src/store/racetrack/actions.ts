import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { BodyUrlRacetrack, Param } from "./reducer";

export const RacetrackCreate = createAsyncThunk(
  "racetrack/RacetrackCR",
  async (bodyvalue: BodyUrlRacetrack) => {
    try {
      const response = await client.post(Endpoint.RACETRACK, bodyvalue);
      return response;
    } catch (err) {}
  },
);

export const RacetrackGet = createAsyncThunk(
  "racetrack/RacetrackCR",
  async (param?: Param) => {
    try {
      let paramReq = {
        pageIndex: param?.pageIndex ?? 1,
        pageSize: param?.pageSize ?? 10,
      };
      const response = await client.get(Endpoint.RACETRACK, {
        params: paramReq,
      });
      console.log("🚀 ~ file: actions.ts ~ line 24 ~ response", response);
      return response?.data?.items;
    } catch (err) {
      console.log(" ~ err", err);
    }
  },
);
